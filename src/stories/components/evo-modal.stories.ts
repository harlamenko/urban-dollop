import {moduleMetadata} from '@storybook/angular';
import {EvoModalWrapperComponent} from './evo-modal-wrapper/evo-modal-wrapper.component';
import {EvoButtonModule, EvoIconModule, EvoModalModule} from '@ud/ui-kit';
import {icons} from '../../../projects/evo-ui-kit/icons';

export default {
    title: 'Components/Modal',

    decorators: [
        moduleMetadata({
            imports: [EvoModalModule, EvoButtonModule, EvoIconModule.forRoot([...icons])],
        }),
    ],
};

export const Default = () => ({
    component: EvoModalWrapperComponent,
    moduleMetadata: {
        declarations: [EvoModalWrapperComponent],
        imports: [EvoModalModule, EvoButtonModule, EvoIconModule.forRoot([...icons])],
    },
    props: {
        id: 'accept',
    },
});

Default.storyName = 'default';
