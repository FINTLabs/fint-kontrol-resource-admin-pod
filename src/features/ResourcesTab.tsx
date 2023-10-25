import React, {useState} from 'react';
import {useOrgUnits} from '../api/OrgUnitContext';
import {useUser} from '../api/UserContext';
import {useRole} from '../api/RoleContext';
import {Select, HStack, VStack, Button, Heading} from "@navikt/ds-react";
import UnitSelectDialog from './UnitSelectDialog';
import { MessageBus } from '@podium/browser';

import {
    ShieldLockIcon,
    PersonIcon,
    Buldings3Icon
} from "@navikt/aksel-icons";


const ResourcesTab = () => {
    const {selectedOrgUnits} = useOrgUnits();
    const {selectedUser, setSelectedUser} = useUser();
    const {selectedAccessRoleId, setSelectedAccessRoleId} = useRole();
    const messageBus = new MessageBus();

    const [showUnitModal, setShowUnitModal] = useState(false);

    const closeModal = () => {
        setShowUnitModal(false);
    };

    function handleSaveRole() {
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

    return (
        <HStack gap={"10"}>
            <VStack gap="4">

                <UnitSelectDialog
                    open={showUnitModal}
                    onClose={closeModal}
                />


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


                <Heading size={"small"}>Choose org units</Heading>
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
                    Velg enhet
                </Button>

            </VStack>
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

                {selectedOrgUnits.length > 0 && (
                    <HStack align="center">
                        <Buldings3Icon title="a11y-title" fontSize="1.5rem"/>
                        <ul>
                            {selectedOrgUnits.map((orgUnit) => (
                                <li key={orgUnit.id}>{orgUnit.name}</li>
                            ))}
                        </ul>
                    </HStack>
                )}
                {selectedUser && selectedAccessRoleId && selectedOrgUnits.length > 0 && (
                    <Button
                        // variant="contained"
                        variant={"primary"}
                        // sx={{ mt: 1, mr: 1 }}
                        onClick={handleSaveRole}
                    >
                        Save Access Role
                    </Button>
                )}


            </VStack>
        </HStack>

    );
};

export default ResourcesTab;
