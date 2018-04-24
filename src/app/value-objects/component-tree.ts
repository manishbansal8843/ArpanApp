import { Components } from "app/value-objects/component";

export class ComponentTree{
    constructor(public component:Components,public children:ComponentTree[]){

    }
}