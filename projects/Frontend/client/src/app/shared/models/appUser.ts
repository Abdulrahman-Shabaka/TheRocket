import { IAddress } from "./IAddress";
import { IAdmin } from "./admin";
import { ILocation } from "./location";
import { IPhone} from "./Iphone";
import { Seller } from "./seller";
import { Buyer } from "./buyer";

export class AppUser {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    seller?: Seller;
    buyer?: Buyer;
    admin?: IAdmin;
    phoneNumbers?: IPhone[];
    addresses?: IAddress[];
    locations?: ILocation[];
    accountType?: number;

    constructor() {
    }
}