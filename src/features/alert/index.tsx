import { Alert } from "@navikt/ds-react"

interface AlertProps {
	variantProp: string
	messageProp: string
}
export const AlertComponent = ({ variantProp, messageProp }: AlertProps) => {
	switch (variantProp) {
		case "error":
			return <Alert variant={"error"}>{messageProp}</Alert>
		case "success":
			return <Alert variant={"success"}>{messageProp}</Alert>
		case "info":
			return <Alert variant={"info"}>{messageProp}</Alert>
		default:
			return <Alert variant={"warning"}>{messageProp}</Alert>
	}
}
