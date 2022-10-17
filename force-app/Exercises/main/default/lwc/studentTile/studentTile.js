import { LightningElement,api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api student= {
        Name: 'Ziyad Ahmed',
        PhotoUrl: '/services/images/photo/0038F00000FZrAsQAL',
    };
    @api isSelected = false;

    @api get tileSelected() {
        return this.isSelected ? "tile selected" : "tile";
    }

    StudentClick(){
       alert("You have selected " + this.student.Name);
       this.isSelected ? (this.isSelected = false) : (this.isSelected = true);
       this.tileSelected();
    }
}