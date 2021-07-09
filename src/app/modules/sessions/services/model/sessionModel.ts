export enum Status {
    SSN_Draft = "SSN_Draft",
    SSN_New = "SSN_New",
    SSN_2Plan = "SSN_2Plan",
    SSN_Planned = "SSN_Planned",
    SSN_Feedbacks = "SSN_Feedbacks",
    SSN_Completed = "SSN_Completed",
    SSN_Cancelled = "SSN_Cancelled",
    SSN_Rejected = "SSN_Rejected"
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

    ID: number;
    CoachID: string;
    CoachEmail: string;
    coachName: string;
    CoacheeID: string;
    CoacheeEmail: string;
    coacheeName: string;
    ScheduledStart: string;
    ScheduledEnd: Date;
    status: Status;
    ScenarioPrimaVisita: boolean;
    ScenarioKOL: boolean;
    ScenarioAreaTerapeutica: string;
    ScenarioKeyMessage: string;
    ScenarioCompetitor: string;
    ScenarioContext1: string;
    ScenarioContext2: string;
    ScenarioDigitalProfile: string;
    ScenarioTerritorio: string;
    ScenarioCMVProfile: string;
    ScenarioAdoption: string;
    ScenarioObiettivi: string;
    ScenarioAgenda: string;

    constructor(ID: number,
        CoachID: string,
        CoachEmail: string,
        coachName: string,
        CoacheeID: string,
        CoacheeEmail: string,
        coacheeName: string,
        ScheduledStart: string,
        ScheduledEnd: Date,
        status: Status,
        ScenarioPrimaVisita: boolean,
        ScenarioKOL: boolean,
        ScenarioAreaTerapeutica: string,
        ScenarioKeyMessage: string,
        ScenarioCompetitor: string,
        ScenarioContext1: string,
        ScenarioContext2: string,
        ScenarioDigitalProfile: string, ScenarioTerritorio: string,
        ScenarioCMVProfile: string,
        ScenarioAdoption: string,
        ScenarioObiettivi: string,
        ScenarioAgenda: string) {
        this.ID = ID;
        CoachID = this.CoachID;
        CoachEmail = this.CoachEmail;
        coachName = this.coachName;
        CoacheeID = this.CoacheeID;
        CoacheeEmail = this.CoacheeEmail;
        coacheeName = this.coacheeName;
        ScheduledStart = this.ScheduledStart;
        ScheduledEnd = this.ScheduledEnd;
        status = this.status;
        ScenarioPrimaVisita = this.ScenarioPrimaVisita;
        ScenarioKOL = this.ScenarioKOL;
        ScenarioAreaTerapeutica = this.ScenarioAreaTerapeutica;
        ScenarioKeyMessage = this.ScenarioKeyMessage;
        ScenarioCompetitor = this.ScenarioCompetitor;
        ScenarioContext1 = this.ScenarioContext1;
        ScenarioContext2 = this.ScenarioContext2;
        ScenarioDigitalProfile = this.ScenarioDigitalProfile,
            ScenarioTerritorio = this.ScenarioTerritorio;
        ScenarioCMVProfile = this.ScenarioCMVProfile;
        ScenarioAdoption = this.ScenarioAdoption;
        ScenarioObiettivi = this.ScenarioObiettivi;
        ScenarioAgenda = this.ScenarioAgenda;

    }

}