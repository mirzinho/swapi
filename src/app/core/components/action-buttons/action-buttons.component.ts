import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewRef
} from '@angular/core';

export interface ActionButton {
    icon: string;
    method: () => void;
}

@Component({
    selector: 'action-buttons',
    templateUrl: './action-buttons.html',
    styleUrls: ['./action-buttons.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsComponent implements OnChanges {
    @Input() buttons: Array<ActionButton>;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.detectChanges();
    }

    buttonClick = (button: ActionButton): void => {
        button.method();
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
