import { LightningElement ,wire} from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import DetailUrl from '@salesforce/schema/EntityDefinition.DetailUrl';

export default class StudentBrowser extends LightningElement {
    // studenList = [];
    @wire (getStudents,{instructorId:'$selectedInstructorId', courseDeliveryId:'$selectedDeliveryId'}) students;
    selectedDeliveryId = '';
    selectedInstructorId = '';
    handleFilterChange(event){
        this.selectedDeliveryId = event.detail.deliveryId;
        this.selectedInstructorId = event.detail.instructorId;
    }
}