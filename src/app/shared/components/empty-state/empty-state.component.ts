import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    standalone: false,
    templateUrl: './empty-state.component.html',
    styleUrl: './empty-state.component.css'
})
export class EmptyStateComponent {
    @Input() title!: string
    @Input() description!: string
    @Input() showSuggestion?: boolean = false

    onSuggestionClick(): void {}
}
