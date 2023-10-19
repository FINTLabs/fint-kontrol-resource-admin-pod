import React from 'react';
import {
    PersonCheckmarkIcon,
    PersonPlusIcon,
} from "@navikt/aksel-icons";
import {Tabs} from "@navikt/ds-react";

import PermissionTab from './PermissionTab';
import ResourcesTab from './ResourcesTab';

const Main = () => {
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
                </Tabs.List>
                <Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">

                    <ResourcesTab  />
                </Tabs.Panel>
                <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">

                    <PermissionTab />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default Main;
