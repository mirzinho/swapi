import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewRef
} from '@angular/core';
import { PageEvent, TableConfig } from './table.interface';

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    styleUrls: ['./table.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges {
    @Input() public config: TableConfig<any>;
    @Output() public pageChanged: EventEmitter<PageEvent> = new EventEmitter();

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('config')) {
            this.config = changes['config'].currentValue;
        }
        this.detectChanges();
    }

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
