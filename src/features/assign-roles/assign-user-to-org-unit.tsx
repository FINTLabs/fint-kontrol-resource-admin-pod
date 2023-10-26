import {Button} from "@navikt/ds-react";
import UnitSelectDialog from "./unit-select-dialog";
import {useState} from "react";
import OrgUnitModal from "./org-unit-modal";

const AssignUserToOrgUnit = ({setOrgUnitsForUser}: any) => {

    return (
        <>
            <OrgUnitModal
                setOrgUnitsForUser={setOrgUnitsForUser}
            />
        </>
    )
}
export default AssignUserToOrgUnit