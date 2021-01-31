import { Component, OnInit } from '@angular/core';
import { MainComponenetsService } from '@app/@shared/services/main-componenets.service';
import { environment } from '@env/environment';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.scss'],
})
export class AllFeedbacksComponent implements OnInit {
  allFeedbacks: any;
  isLoading: boolean = false;
  baseUrl: any = environment.serverUrl;

  constructor(config: NgbRatingConfig, private mcService: MainComponenetsService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    this.isLoading = true;
    this.mcService.getAllFeedbacks().subscribe(
      (res) => {
        this.allFeedbacks = res.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  // moment(res.data[0].end_at, "HH:mm").format("hh:mm");
}
