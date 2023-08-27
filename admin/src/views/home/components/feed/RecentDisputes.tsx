import { Button, Card, Table } from "@/components/ui"
import dayjs from "dayjs"

const RecentDisputes = () => {
    const { Tr, Th, Td, THead, TBody } = Table

    return (
        <Card>
            <h4 className="text-base">Recent Disputes</h4>

            <Table>
                <THead>
                    <Tr>
                        <Th className="!text-gray-800">Client</Th>
                        <Th className="!text-gray-800">Provider</Th>
                        <Th className="!text-gray-800">Category</Th>
                        <Th className="!text-gray-800">Service ID</Th>
                        <Th className="!text-gray-800">Service Cost</Th>
                        <Th className="!text-gray-800">Time Started</Th>
                        <Th className="!text-gray-800">Actions</Th>
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>Roronoa Zoro</Td>
                        <Td>Baroque Works</Td>
                        <Td>Plumbing</Td>
                        <Td>#Bnuy9o</Td>
                        <Td>₦{45000?.toLocaleString()}</Td>
                        <Td>{dayjs().format('DD/MM/YYYY HH:mm')}</Td>
                        <Td className="flex items-center gap-2">
                            <Button
                                variant="solid"
                                size="xs"
                                color="slate-900"
                            >
                                View Service
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                                color="red-600"
                            >
                                Refund Client
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                            >
                                Pay Provider
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Roy Mustang</Td>
                        <Td>M&M Electronics</Td>
                        <Td>Electrical</Td>
                        <Td>#lObd4f</Td>
                        <Td>₦{38000?.toLocaleString()}</Td>
                        <Td>{dayjs().format('DD/MM/YYYY HH:mm') }</Td>
                        <Td className="flex items-center gap-2">
                            <Button
                                variant="solid"
                                size="xs"
                                color="slate-900"
                            >
                                View Service
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                                color="red-600"
                            >
                                Refund Client
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                            >
                                Pay Provider
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Monkey D Luffy</Td>
                        <Td>Takoyaki Paradise</Td>
                        <Td>Plumbing</Td>
                        <Td>#NhYh90</Td>
                        <Td>₦{97000?.toLocaleString()}</Td>
                        <Td>{dayjs().format('DD/MM/YYYY HH:mm') }</Td>
                        <Td className="flex items-center gap-2">
                            <Button
                                variant="solid"
                                size="xs"
                                color="slate-900"
                            >
                                View Service
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                                color="red-600"
                            >
                                Refund Client
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                            >
                                Pay Provider
                            </Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Admiral Kizaru</Td>
                        <Td>Baroque Works</Td>
                        <Td>Plumbing</Td>
                        <Td>#koAf65</Td>
                        <Td>₦{155800?.toLocaleString()}</Td>
                        <Td>{dayjs().format('DD/MM/YYYY HH:mm') }</Td>
                        <Td className="flex items-center gap-2">
                            <Button
                                variant="solid"
                                size="xs"
                                color="slate-900"
                            >
                                View Service
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                                color="red-600"
                            >
                                Refund Client
                            </Button>
                            <Button
                                variant="solid"
                                size="xs"
                            >
                                Pay Provider
                            </Button>
                        </Td>
                    </Tr>
                </TBody>
            </Table>
        </Card>
    )
}
export default RecentDisputes