import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent {

	constructor(private LoaderService: LoaderService) { }

	showLoader() {
		this.LoaderService.show()
	}

	hideLoader() {
		this.LoaderService.hide()
	}
}
