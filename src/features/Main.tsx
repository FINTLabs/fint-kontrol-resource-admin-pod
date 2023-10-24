import React, {useState} from 'react';
import {
    PersonCheckmarkIcon,
    PersonPlusIcon,
} from "@navikt/aksel-icons";
import {Tabs} from "@navikt/ds-react";

import ResourcesTab from './ResourcesTab';
import {PermissionMainComponent} from "./permission-tab/permission-main.component";
import {UsersRolesMainComponent} from "./users-roles-tab/users-roles-main.component";

const Main = () => {
    const [selectedTab, setSelectedTab] = useState<string>('tildel')
    return (
        <div>
            <h2 id="tableTitle">
                Applikasjonsadministrator
            </h2>

            <Tabs defaultValue="tildel" onChange={setSelectedTab}>
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

                {selectedTab === 'tildel' &&
                    <Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">
                        <ResourcesTab  />
                    </Tabs.Panel>
                }

                {selectedTab === 'inbox' &&
                    <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">
                        <PermissionMainComponent />
                    </Tabs.Panel>
                }

                {selectedTab === 'usersWithRoles' &&
                    <Tabs.Panel value="usersWithRoles" className="h-24 w-full bg-gray-50 p-4">
                        <UsersRolesMainComponent />
                    </Tabs.Panel>
                }


            </Tabs>
        </div>
    );
};

export default Main;
