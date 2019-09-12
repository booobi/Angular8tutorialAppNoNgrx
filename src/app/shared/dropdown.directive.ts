import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appdropdown]'
})
export class DropdownDirective {
    @HostBinding("class.open") isOpen = false;
    @HostListener('click') onClick() {
        this.isOpen = !this.isOpen;
    }


}