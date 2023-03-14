import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  urlName: string;
  urlShort: string;
  urlProcessed: boolean;
  loading: boolean;
  showError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) {
    this.urlName = '';
    this.urlShort = '';
    this.urlProcessed = false;
    this.loading = false;
    this.showError = false;
    this.textError = '';
  }

  ngOnInit(): void {}

  processUrl(): void {
    if (this.urlName === '') {
      this.error('Please provide a URL');
      return;
    }

    this.urlProcessed = false;
    this.loading = true;

    this._shortUrlService.getShortUrl(this.urlName).subscribe(
      (data: any) => {
        this.urlShort = data.link;
        this.urlProcessed = true;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        this.urlName = '';
        if(error.error.description === 'The value provided is invalid.') {
          this.error('The provided URL is invalid');
        }
      }
    );
  }

  error(value: string) {
    this.showError = true;
    this.textError = value;

    setTimeout(() => {
      this.showError = false;
      this.textError = '';
    }, 3000);
  }
}
