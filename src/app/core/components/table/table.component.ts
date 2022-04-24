import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewRef
} from '@angular/core';
import { PageEvent, TableCell, TableConfig } from './table.interface';
import { getTableCellSettings, setTableCellSettings } from '../../utils/utils';

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    styleUrls: ['./table.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnChanges {
    @Input() public config: TableConfig<T>;
    @Output() public pageChanged: EventEmitter<PageEvent> = new EventEmitter();
    @Output() public rowClicked: EventEmitter<T> = new EventEmitter();
    @Output() public search: EventEmitter<string> = new EventEmitter();

    public backupData: Array<any>;
    constructor(private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('config')) {
            this.config = changes['config'].currentValue;
            if (changes['config'].currentValue?.data) {
                this.backupData = [...changes['config'].currentValue?.data];
            }

            const sortedCell = this.config.columns.filter((f) => f.sorting);
            const savedCell = getTableCellSettings(this.config.entityType);
            if (savedCell) {
                const index = this.config.columns.findIndex(
                    (x) => (x.property = savedCell.property)
                );
                if (index >= 0) {
                    this.config.columns[index] = {
                        ...this.config.columns[index],
                        ...savedCell
                    };
                }
                this.sortData(savedCell);
            } else if (sortedCell.length) {
                this.sortData(sortedCell[0]);
            }
        }

        this.detectChanges();
    }

    sort = (cell: TableCell<any>): void => {
        const sortedColumns = this.config.columns.filter((f) => f.sorting);
        if (sortedColumns.length && sortedColumns[0].property != cell.property) {
            delete sortedColumns[0].sorting;
        }

        if (!cell.sorting) {
            cell.sorting = 'asc';
        } else if (cell.sorting == 'asc') {
            cell.sorting = 'desc';
        } else if (cell.sorting == 'desc') {
            delete cell.sorting;
            this.config.data = [...this.backupData];
        }

        setTableCellSettings<T>(cell, this.config.entityType);
        this.sortData(cell);
    };

    sortData = (cell: TableCell<T>): void => {
        if (cell.sorting) {
            this.config.data?.sort((a, b) => {
                if (a[cell.property] < b[cell.property]) return -1;
                if (a[cell.property] > b[cell.property]) return 1;
                return 0;
            });

            if (cell.sorting == 'desc') {
                this.config.data?.reverse();
            }
        }
    };

    rowLink = (row: T): void => {
        this.rowClicked.emit(row);
    };

    onSearch = (query: string): void => {
        this.search.emit(query);
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
