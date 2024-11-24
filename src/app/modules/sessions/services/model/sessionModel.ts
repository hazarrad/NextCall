import { Users } from "./Users";


export enum Status {
    SSN_Draft = "SSN_Draft",
    SSN_New = "SSN_New",
    SSN_2Plan = "SSN_2Plan",
    SSN_Planned = "SSN_Planned",
    SSN_Feedbacks = "SSN_Feedbacks",
    SSN_Completed = "SSN_Completed",
    SSN_Cancelled = "SSN_Cancelled",
    SSN_Rejected = "SSN_Rejected",
    SSN_Draf = "SSN_Draf"
}

// export class configuration {

//     ID: number;
//     Key: string;
//     Value: string;
//     constructor(ID: number, Key: string,
//         Value: string) {
//         ID = this.ID;
//         Key = this.Key;
//         Value = this.Value;

//     }
// }

export class Sessions {

    id: number;
    coachID: Users;
    coachee_id: Users;
    scheduledStart: Date;
    scheduledEnd: Date;
    status: Status;
    scenarioPrimaVisita: boolean;
    scenarioKOL: boolean;
    scenarioAreaTerapeutica: string;
    scenarioKeyMessage: string;
    scenarioCompetitor: string;
    scenarioContext1: string;
    scenarioContext2: string;
    scenarioDigitalProfile: string;
    scenarioTerritorio: string;
    scenarioCMVProfile: string;
    scenarioAdoption: string;
    scenarioObiettivi: string;
    scenarioAgenda: string;
    cancellationReason: string;
    cancelledBy: string;



    constructor(id: number,
        coachID: Users,
        coachee_id: Users,
        scheduledStart: Date,
        scheduledEnd: Date,
        status: Status,
        scenarioPrimaVisita: boolean,
        scenarioKOL: boolean,
        scenarioAreaTerapeutica: string,
        scenarioKeyMessage: string,
        scenarioCompetitor: string,
        scenarioContext1: string,
        scenarioContext2: string,
        scenarioDigitalProfile: string,
        scenarioTerritorio: string,
        scenarioCMVProfile: string,
        scenarioAdoption: string,
        scenarioObiettivi: string,
        scenarioAgenda: string,
        cancellationReason: string,
        cancelledBy: string,) {

        this.id = id;
        this.coachID = coachID;
        this.coachee_id = coachee_id;
        this.scheduledStart = scheduledStart;
        this.scheduledEnd = scheduledEnd;
        this.status = status;
        this.scenarioPrimaVisita = scenarioPrimaVisita;
        this.scenarioKOL = scenarioKOL;
        this.scenarioAreaTerapeutica = scenarioAreaTerapeutica;
        this.scenarioKeyMessage = scenarioKeyMessage;
        this.scenarioCompetitor = scenarioCompetitor;
        this.scenarioContext1 = scenarioContext1;
        this.scenarioContext2 = scenarioContext2;
        this.scenarioDigitalProfile = scenarioDigitalProfile;
        this.scenarioTerritorio = scenarioTerritorio;
        this.scenarioCMVProfile = scenarioCMVProfile;
        this.scenarioAdoption = scenarioAdoption;
        this.scenarioObiettivi = scenarioObiettivi;
        this.scenarioAgenda = scenarioAgenda;
        this.cancellationReason = cancellationReason;
        this.cancelledBy = cancelledBy;

    }

}