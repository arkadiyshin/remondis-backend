
export interface CaseState {
    id: number;
    title: string;
}
export const STATE_CREATED : CaseState = {id: 1, title: 'Created'};
export const STATE_ASSIGNED : CaseState = {id: 2, title: 'Assigned'};
export const STATE_CONFIRMED : CaseState = {id: 3, title: 'Confirmed'};
export const STATE_ONGOING : CaseState = {id: 4, title: 'Ongoing'};
export const STATE_READY : CaseState = {id: 5, title: 'Ready'};
export const STATE_QUOTED : CaseState = {id: 6, title: 'Quoted'};
export const STATE_CLOSED : CaseState = {id: 7, title: 'Closed'};

export interface Action {
    message: string;
    action: string;
}
export type ActionList = {
    [key: number]: Action,
}

export const MANAGER_ACTIONS: ActionList =
{
    1: {
        message: "Case not assigned",
        action: "Assign the case"
    },
    2: {
        message: "Case not confirmed by inspector",
        action: "Call inspector"
    },
    3: {
        message: "Date of appointment wasn't created",
        action: "Call inspector"
    },
    4: {
        message: "Appointment finished, case wasn't completed",
        action: "Call inspector"
    },
    5: {
        message: "Case not quoted",
        action: "Send quote to owner"
    }
}

export const INSPECTOR_ACTIONS: ActionList =
{

    2: {
        message: "Case not accepted",
        action: "Accept the case"
    },
    3: {
        message: "Appointment wasn't created",
        action: "Call owner"
    },
    4: {
        message: "Case not submitted",
        action: "Submit the case"
    }
}

export const MANAGER_TODO_STATES = [STATE_CREATED.id, STATE_ASSIGNED.id, STATE_ONGOING.id, STATE_READY.id];
export const INSPECTOR_TODO_STATES = [STATE_CREATED.id, STATE_ONGOING.id];