import React, {useState} from 'react';
import {useOrgUnits} from '../../api/OrgUnitContext';
import {useUser} from '../../api/UserContext';
import {useRole} from '../../api/RoleContext';
import {Select, HStack, VStack, Button, Heading} from "@navikt/ds-react";
import UnitSelectDialog from './unit-select-dialog';
import { MessageBus } from '@podium/browser';
import {
    ShieldLockIcon,
    PersonIcon,
    Buldings3Icon
} from "@navikt/aksel-icons";
import RolesToolbar from "./roles-toolbar";
import styled from "styled-components";
import AssignUserRoleTable from "./assign-user-role-table";
import AssignUserToOrgUnit from "./assign-user-to-org-unit";
import {IOrgUnit} from "../../api/types";

const HStackStyled = styled(HStack)`
    margin-top: 1rem;
`


const Main = () => {
    const {selectedOrgUnits} = useOrgUnits();
    const {selectedUser, setSelectedUser} = useUser();
    const {selectedAccessRoleId, setSelectedAccessRoleId} = useRole();
    const messageBus = new MessageBus();
    const [orgUnitsForUser, setOrgUnitsForUser] = useState<IOrgUnit[]>([])

    const handleSaveRole = () => {
        messageBus.publish('testChannel', 'testTopic', "Save Role Clicked");
        console.log("published a message to test channel");
        return undefined;
    }

    const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = parseInt(e.target.value, 10);
        if (userId === 0) {
            setSelectedUser(null);
        } else {
            // const selectedUser = usersPage?.users.find((user) => user.id === userId);
            // if (selectedUser) {
            //     setSelectedUser(selectedUser);
            // }
        }
    };

    console.log(selectedUser + "-" + selectedAccessRoleId + "-" + selectedOrgUnits.length + ".")

    return (
        <HStackStyled gap={"10"}>
            <RolesToolbar setSelectedAccessRoleId={setSelectedAccessRoleId} handleSelectUser={handleSelectUser} />

            <AssignUserRoleTable />

            <VStack>
                {selectedUser && (
                    <HStack align="center" gap={"5"}>
                        <PersonIcon title="a11y-title" fontSize="1.5rem"/>
                        <Heading size={"small"}>{selectedUser.fullName}</Heading>
                    </HStack>
                )}

                {selectedAccessRoleId && (
                    <HStack align="center" gap={"5"}>
                        <ShieldLockIcon title="a11y-title" fontSize="1.5rem"/>
                        <Heading size={"small"}>
                            {selectedAccessRoleId === 'aa' ?
                                'Applikasjonsadministrator' :
                                'Applikasjonstilgangsadministrator'}
                        </Heading>
                    </HStack>

                )}

                <AssignUserToOrgUnit setOrgUnitsForUser={setOrgUnitsForUser}  />

                <div>
                    <p>
                        Valgte orgenheter brukeren skal ha: {orgUnitsForUser.map(unit => unit.name)}
                    </p>
                </div>

                {/*{selectedOrgUnits.length > 0 && (*/}
                {/*    <HStack align="center">*/}
                {/*        <Buldings3Icon title="a11y-title" fontSize="1.5rem"/>*/}
                {/*        <ul>*/}
                {/*            {selectedOrgUnits.map((orgUnit) => (*/}
                {/*                <li key={orgUnit.id}>{orgUnit.name}</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </HStack>*/}
                {/*)}*/}
                {/*{selectedUser && selectedAccessRoleId && selectedOrgUnits.length > 0 && (*/}
                {/*    <Button*/}
                {/*        // variant="contained"*/}
                {/*        variant={"primary"}*/}
                {/*        // sx={{ mt: 1, mr: 1 }}*/}
                {/*        onClick={handleSaveRole}*/}
                {/*    >*/}
                {/*        Save Access Role*/}
                {/*    </Button>*/}
                {/*)}*/}
            </VStack>
        </HStackStyled>

    );
};

export default Main;
