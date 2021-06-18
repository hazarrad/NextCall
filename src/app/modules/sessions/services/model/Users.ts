


export enum Roles {

    Admin = "Admin",
    Coach = "Coach",
    Coachee = "Coachee"
}


export enum Profile {

    Manager = "Manager",
    Junior = "Junior",
    Senior = "Senior"
}




export class Users {

    id: number;
    name: string;
    role: Roles;
    profile: Profile;
    isActive: boolean;
    namePic: string;
    typePic: string;
    picture: string;
    lastLoginDate: Date;
    managerEmail: string;
    dateCeated: Date;
    email: string;
    password: string;


    constructor(
        name: string,
        role: Roles,
        profile: Profile,
        isActive: boolean,
        namePic: string,
        typePic: string,
        picture: string,
        lastLoginDate: Date,
        managerEmail: string,
        dateCeated: Date,
        email: string,
        password: string
    ) {

        this.name = name;
        this.role = role;
        this.profile = profile;
        this.isActive = isActive;
        this.namePic = namePic;
        this.typePic = typePic;
        this.picture = picture;
        this.lastLoginDate = lastLoginDate;
        this.managerEmail = managerEmail;
        this.dateCeated = dateCeated;
        this.email = email;
        this.password = password

    }

}