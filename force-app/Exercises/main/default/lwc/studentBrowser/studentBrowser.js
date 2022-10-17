import { LightningElement ,wire} from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';

export default class StudentBrowser extends LightningElement {
    // studenList = [];
    @wire (getStudents,{instructorId:"", courseDeliveryId:""}) students;
}