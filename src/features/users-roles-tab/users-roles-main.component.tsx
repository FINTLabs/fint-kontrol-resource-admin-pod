import styled from "styled-components";
import {Loader, Pagination, Select, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from '@navikt/aksel-icons';
import {useContext} from "react";
import {UsersContext} from "../../api/UserContext";
import {NavLink} from "react-router-dom";
import {IUser} from "../../api/types";

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

export const UsersRolesMainComponent = () => {
    const {
        currentPage,
        isLoading,
        itemsPerPage,
        setItemsPerPage,
        usersPage,
        updateCurrentPage
    } = useContext(UsersContext)



    let paginatedData = usersPage ? usersPage.users : null

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setItemsPerPage((parseInt(event.target.value, 10)))
        updateCurrentPage(1);
    };

    // Hent api/accessmanagement/v1/user
    // List en tabell over alle brukere med rettigheter uavhengig hva
    // Koble ressurs-id mot ressursen/featuren
    console.log(usersPage)
    return (
        <div>
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
                    {(isLoading && !usersPage)
                        ?
                        <Table.Row key={1} className="loading-table">
                            <Table.DataCell colSpan={5}>
                                <LoaderStyled size="3xlarge" title="Laster" className="loader"/>
                            </Table.DataCell>
                        </Table.Row>
                        :

                        paginatedData?.map((user: IUser, i) => {
                            return (
                                <Table.Row key={i}>
                                    <Table.DataCell>{user.userName}</Table.DataCell>
                                    <Table.DataCell>{user.userType}</Table.DataCell>
                                    {/*<Table.DataCell align="right">{user.resourceLimit}</Table.DataCell>*/}
                                    {/*<Table.DataCell align="right">{user.resourceLimit}</Table.DataCell>*/}
                                    <Table.DataCell>
                                        <NavLink to={`info/${user.id}`} className="flex-center-vertically" id={`resource-${i}`}>
                                            Se detaljer <InformationSquareIcon className="margin-left-1-x"/>
                                        </NavLink>
                                    </Table.DataCell>
                                </Table.Row>
                            )
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
                        onPageChange={updateCurrentPage}
                        count={Math.ceil(usersPage?.totalItems / itemsPerPage)}
                        siblingCount={itemsPerPage}
                        size="small"
                    />
                }
            </PaginationWrapper>
        </div>
    )
}