"use client"

import TenderArchive from "@/components/TenderArchive"
import { useRouter } from "next/router"
import { Container } from "semantic-ui-react"

export default function () {
    return (
        <Container>
            <h2>Архив</h2>
            <TenderArchive />
        </Container>
    )
}