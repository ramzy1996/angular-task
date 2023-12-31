import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-task';
    sideBarOpen = true;
    sideBarToggler() {
        this.sideBarOpen = !this.sideBarOpen;
    }
}
