import {Pipe, PipeTransform} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Pipe({
  name: 'purehtml',
})
export class PurehtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value)
  }
}
