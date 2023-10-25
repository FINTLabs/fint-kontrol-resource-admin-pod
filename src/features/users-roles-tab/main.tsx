import React from "react";
import styled from "styled-components";
import {Loader, Pagination, Select, Table} from "@navikt/ds-react";
import {useUser} from "../../api/UserContext";

const TableStyled = styled(Table)`
    thead {
        th:nth-child(-n+2) {
            width: 400px;
        }

        th:nth-child(2+n) {
            width: 75px;
        }

        th:last-child {
            width: 125px;
        }
    }

    .loading-table {
        td {
            border-bottom: none;
        }
    }
`

const LoaderStyled = styled(Loader)`
    display: flex;
    margin: auto;
`

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    
    margin-top: 1rem;
`

export const UsersRolesMain = () => {
    const {
        currentPage,
        isLoading,
        itemsPerPage,
        setCurrentPage,
        setItemsPerPage,
        usersPage,
    } = useUser()

    //Temporary list with any-type because of missing API specifications and fields.
    let obsoloteList: any = usersPage


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let paginatedData = usersPage ? usersPage.users : null

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setItemsPerPage((parseInt(event.target.value, 10)))
        setCurrentPage(1);
    };

    if(!usersPage) {
        return <BlankTable />
    }

    return (
        <div>
            <TableStyled id="resource-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Fult navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Epost</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(isLoading)
                        ?
                        <Table.Row key={1} className="loading-table">
                            <Table.DataCell colSpan={2}>
                                <LoaderStyled size="3xlarge" title="Laster" className="loader"/>
                            </Table.DataCell>
                        </Table.Row>
                        :

                        obsoloteList.map((user: any, i: number) => {
                            if(i < 50) { // Remove when pagination support is added to api. Also verify that required data is displayed
                                return (
                                    <Table.Row key={i}>
                                        <Table.DataCell>{user.firstName} {user.lastName}</Table.DataCell>
                                        <Table.DataCell>{user.userName}</Table.DataCell>
                                    </Table.Row>
                                )
                            } return null
                        })
                    }
                </Table.Body>
            </TableStyled>

            <PaginationWrapper>
                <Select label="Rader per side" size="small" onChange={handleChangeRowsPerPage} defaultValue={itemsPerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                {(usersPage !== null && !isLoading) &&
                    <Pagination
                        id="pagination"
                        page={currentPage}
                        onPageChange={setCurrentPage}
                        count={Math.ceil(50 / itemsPerPage)} // usersPage?.totalItems instead of 50 when api is updated
                        siblingCount={itemsPerPage}
                        size="small"
                    />
                }
            </PaginationWrapper>
        </div>
    )
}


const CenteredDataCell = styled(Table.DataCell)`
    text-align: center;
`
const BlankTable = () => {
    return (
        <TableStyled id="resource-table">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Type</Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">Antall totalt</Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">Antall i bruk</Table.HeaderCell>
                    <Table.HeaderCell scope="col"></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row key={1} className="loading-table">
                    <CenteredDataCell colSpan={5}>
                        Tabellen ser ut til å være tom eller udefinert
                    </CenteredDataCell>
                </Table.Row>
            </Table.Body>
        </TableStyled>
    )
}