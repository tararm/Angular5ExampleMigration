import { Component,OnInit,Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
    templateUrl: './frontlog.component.html',
    styleUrls: ['./frontlog.component.css','./email.component.css']
})
export class FrontLogComponent implements OnInit {
    public forecasts: WeatherForecast[];
    private  previousLog:any;   
    private currentLog: any;  
    private router: Router;
    private sharedLogId: number;
    private showEmailForm: boolean = false;
    private email: string;
    private emailSubject: string;
    private toasterService: ToasterService;
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, router: Router, toasterService: ToasterService) {
        this.router = router;
        this.toasterService = toasterService;
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];

        }, error => console.error(error));
    }

    ngOnInit(): void {
        let connection = new HubConnection('/message');
        connection.on('send', data => {
            console.log(data);
            this.popToast();
        });

        connection.start()
            .then(() => console.log('Connected'));
    }

 openLog(m) {
        m.show = !m.show;
        this.previousLog = this.currentLog;
        this.currentLog = m;
        if (this.previousLog != this.currentLog) {
            this.previousLog.show = false;
        }
    }

 openLogDetails() {
     this.router.navigateByUrl('/frontlogdetails');
 }

 shareLog() {
     this.showEmailForm = true;
 }

 closeEmailForm() {
     this.showEmailForm = false;
 }
 sendEmail() {
     console.log(this.emailSubject)
     console.log(this.email)
     this.showEmailForm = false;
 }
 popToast() {
     var toast: Toast = {
         type: 'info',
         title: 'New Log',
         body: 'Here is a Toast Body',
         showCloseButton: true,
         clickHandler: (t, isClosed): boolean => {
             console.log('i am clicked..', isClosed, t);

             // got clicked and it was NOT the close button!
             if (!isClosed) {

             }

             return true; // remove this toast !
         }
     };
     this.toasterService.pop(toast);
 }

}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

//export class FrontLogComponent implements OnInit {
//    array: number[] = [];
//    sum = 100;
//    throttle = 300;
//    scrollDistance = 1;
//    scrollUpDistance = 2;
//    direction = '';
//    title = 'Test';



//    public forecasts: WeatherForecast[];
//    private previousLog: any;
//    private currentLog: any;
//    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
//        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
//            this.forecasts = result.json() as WeatherForecast[];

//        }, error => console.error(error));
//        for (let i = 0; i < this.sum; ++i) {
//            this.array.push(i);
//        }
//    }
//    ngOnInit(): void {

//    }
//    onScrollDown() {
//        console.log('scrolled!!');

//        // add another 20 items
//        const start = this.sum;
//        this.sum += 20;
//        for (let i = start; i < this.sum; ++i) {
//            this.array.push(i);
//        }
//    }

//    openLog(m) {
//        m.show = !m.show;
//        this.previousLog = this.currentLog;
//        this.currentLog = m;
//        if (this.previousLog != this.currentLog) {
//            this.previousLog.show = false;
//        }
//    }

//}


