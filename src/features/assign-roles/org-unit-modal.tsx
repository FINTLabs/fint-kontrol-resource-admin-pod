import {BodyLong, Button, Modal} from "@navikt/ds-react";
import {useRef, useState} from "react";
import {useOrgUnits} from "../../api/OrgUnitContext";

interface OrgUnitModal{
    setOrgUnitsForUser: () => void
}

const OrgUnitModal = ({setOrgUnitsForUser}: OrgUnitModal) => {
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <div className="py-16">
            <Button onClick={() => ref.current?.showModal()}>Velg orgenhet</Button>

            <Modal ref={ref} header={{ heading: "Knytt brukerrollen til orgenhet" }}>
                <Modal.Body>
                    <BodyLong>
                        <OrgUnitTree />
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={() => ref.current?.close()}>
                        Velg orgenhet
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => ref.current?.close()}
                    >
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}


const OrgUnitTree = () => {
    const { orgUnitsData} = useOrgUnits();
    const [aggregated, setAggregated] = useState(false);

    console.log(orgUnitsData)

    return (
        <>
            tree
        </>
    )
}

export default OrgUnitModal