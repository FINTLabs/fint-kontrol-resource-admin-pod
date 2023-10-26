import React from 'react';
import {
    PersonCheckmarkIcon,
    PersonPlusIcon,
} from "@navikt/aksel-icons";
import {Tabs} from "@navikt/ds-react";

import Main from './assign-roles/main';
import {PermissionMain} from "./permission-tab/main";
import {UsersRolesMain} from "./users-roles-tab/main";
import styled from "styled-components";

const LandingComponent = () => {
    return (
        <div>
            <h2 id="tableTitle">
                Applikasjonsadministrator
            </h2>

            <Tabs defaultValue="tildel">
                <Tabs.List>
                    <Tabs.Tab
                        value="tildel"
                        label="Tildel rettigheter"
                        icon={<PersonPlusIcon title="historielogg" />}
                    />
                    <Tabs.Tab
                        value="inbox"
                        label="Definer rolle"
                        icon={<PersonCheckmarkIcon title="inbox" />}
                    />
                    <Tabs.Tab
                        value="usersWithRoles"
                        label="Se brukere med roller"
                        icon={<PersonCheckmarkIcon title="inbox" />}
                    />
                </Tabs.List>

                <Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">
                    <Main  />
                </Tabs.Panel>

                <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">
                    <PermissionMain />
                </Tabs.Panel>

                <Tabs.Panel value="usersWithRoles" className="h-24 w-full bg-gray-50 p-4">
                    <UsersRolesMain />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default LandingComponent;
