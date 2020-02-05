import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { IData } from '../models/total.model';

@Injectable()
export class DatabaseService {

    dataRef: AngularFireObject<IData>;

    constructor(private fireDatabase: AngularFireDatabase){
    }

    getData(): any {
        return this.fireDatabase.list('data').valueChanges();
    }

    addData(dta: IData){
        this.fireDatabase.list('data').push(dta);
    }

    editData(id: string, selectedDta: IData){
        this.fireDatabase.object(id).update(selectedDta);
    }

    editData2(selectedDta: IData){
        this.dataRef = this.fireDatabase.object(selectedDta.uid);
        this.dataRef.update({
            val2: selectedDta.val2
        })
        .catch(err => console.log(err));
    }

}