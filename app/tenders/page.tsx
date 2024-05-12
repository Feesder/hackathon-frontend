"use client"

import TenderGrid from "@/components/TenderGrid"
import { useRouter } from "next/router"
import { Container } from "semantic-ui-react"

export default function () {
    return (
        <Container>
            <h2>Список тендеров</h2>
            <TenderGrid />
        </Container>
    )
}