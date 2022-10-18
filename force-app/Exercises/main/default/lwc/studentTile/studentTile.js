import { LightningElement,api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api student= {
        Name: 'Ziyad Ahmed',
        PhotoUrl: '/services/images/photo/0038F00000FZrAsQAL',
    };
    @api selectedStudentId = '';

    @api get tileSelected() {
        return (this.selectedStudentId===this.student.Id) ? "tile selected" : "tile";
    }

    studentClick(){
        const evt = new CustomEvent('studentselected', {
        detail: { studentId: this.student.Id }
        });
        // console.log(this.student.Id);
        this.dispatchEvent(evt);
    }
}