import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EvoBaseControl} from '../../common/evo-base-control';
import {EvoControlStates} from '../../common/evo-control-state-manager/evo-control-states.enum';

export enum EvoChipType {
    radio = 'radio', // default
    checkbox = 'checkbox',
    label = 'label',
}

export enum EvoChipTheme {
    grey = 'grey', // default
    white = 'white',
}

@Component({
    selector: 'evo-chip',
    templateUrl: 'evo-chip.component.html',
    styleUrls: [
        'evo-chip.component.scss',
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EvoChipComponent),
            multi: true,
        },
    ],
})
export class EvoChipComponent extends EvoBaseControl implements ControlValueAccessor, OnInit, AfterViewInit {

    @Input() type: EvoChipType | string;
    @Input() theme: EvoChipTheme | string;
    @Input() counter: number;
    @Input() disabled: boolean;
    @Input() name: string;
    @Input() closable: boolean;
    @Input() closeTitle = '';

    @Input('value') set setInitialValue(value: any) {
        this.inheritedValue = value;
    }

    @Output() close = new EventEmitter<Event>();

    inheritedValue: any;

    templateVariables = {
        chipTypes: EvoChipType,
        chipThemes: EvoChipTheme,
    };

    private _value: any;

    get classes(): string[] {
        const states = {
            'touched': this.control?.touched,
            'valid': this.currentState[EvoControlStates.valid],
            'invalid': this.currentState[EvoControlStates.invalid],
            'disabled': this.control?.disabled,
        };

        const result = Object.keys(states)
            .filter((key: string) => states[key]);

        result.push(`theme-${ this.theme || EvoChipTheme.grey }`);

        result.push(`type-${ this.type }`);

        return result;
    }

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
        this.onChange(value);
        this.onTouched();
    }

    ngOnInit(): void {
        this.initDefaultParams();
    }

    ngAfterViewInit() {
        if (this.control) {
            this.control.valueChanges.subscribe(() => {
                this.writeValue(this.control.value);
            });
        }
    }

    writeValue(value: any): void {
        this._value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onInputChange(value): void {
        this.value = value;
    }

    onCloseClick(e: Event): void {
        this.close.emit(e);
    }

    private initDefaultParams(): void {
        if (!this.type) {
            this.type = EvoChipType.radio;
        }
        if (!this.theme) {
            this.theme = EvoChipTheme.grey;
        }
    }

    private onChange(value): void {
    }

    private onTouched(): void {
    }
}
