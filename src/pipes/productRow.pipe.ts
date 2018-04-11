/**
 * Created by asto on 2017/9/5.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productRowPipe'
})
export class ProductRowPipe implements PipeTransform {
    transform(rows: any) {
        if (!!rows) {
            var row = 0;
            var windowWidth = document.body.clientWidth;
            var info = rows.split("\n");
            var infoNum;
            for (var i in info) {
                if (windowWidth < 376) {
                    infoNum = 19;
                } else {
                    infoNum = 17;
                }
                var infoLength = info[i].length * infoNum;
                var rowNum = Math.ceil(infoLength / windowWidth);
                row = row + rowNum;
            }
            return row;
        }
    }
}
