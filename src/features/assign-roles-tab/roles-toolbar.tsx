import styled from "styled-components";
import UnitSelectDialog from "./unit-select-dialog";
import React, {useState} from "react";
import {Buldings3Icon} from "@navikt/aksel-icons";
import {Button, Select} from "@navikt/ds-react";

const ToolbarContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: end;
    gap: 2rem;
    
    width: 100%;
`

interface RolesToolbarProps {

}

const RolesToolbar = ({setSelectedAccessRoleId, handleSelectUser}: any) => {
    const [showUnitModal, setShowUnitModal] = useState(false);

    const closeModal = () => {
        setShowUnitModal(false);
    };

    return (
        <ToolbarContainer>
            <UnitSelectDialog
                open={showUnitModal}
                onClose={closeModal}
            />

            <div>
                <Button
                    iconPosition="right"
                    icon={<Buldings3Icon aria-hidden/>}
                    id={'selectUnitsIcon'}
                    // variant="outlined"
                    variant={"secondary"}
                    onClick={() => {
                        setShowUnitModal(true)
                    }}
                >
                    Velg orgenhet
                </Button>
            </div>

            <Select
                label="Velg rolle"
                size={"medium"}
                onChange={(e) => setSelectedAccessRoleId(e.target.value as string)}
                id={"rolle"}
                defaultValue={""}
            >
                <option value="">Velg rolle</option>
                <option value="aa">Applikasjonsadministrator</option>
                <option value="ata">Applikasjonstilgangsadministrator</option>
                <option value="e">Enhetsleder</option>
                <option value="s">Sluttbruker</option>
            </Select>

            <Select
                label="Velg brukeren"
                // children={usersPage?.users?.map((member) => `${member.firstName} ${member.lastName}`)}
                id={"brukeren"}
                onChange={(e) => handleSelectUser(e)}
                defaultValue={""}
            >
                <option value="" disabled>Velg brukeren</option>
                <option>
                    "userfullName"
                </option>
            </Select>


        </ToolbarContainer>
    )
}

export default RolesToolbar