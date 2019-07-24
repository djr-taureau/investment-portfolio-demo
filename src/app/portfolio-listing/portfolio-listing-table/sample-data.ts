import { Company } from "@app/core/domain/company.model";

// Randomly generated using top 200 lists for name, male name, female name and uk city
export const companies: any[] = [
    {
        name: "WeWork",
        logo: "assets/image/nauset.jpg",
        dealTeam: [
            {
                id: "0",
                companyName: "ARM",
                firstName: "Damien",
                lastName: "Lee",
                avatar: "assets/image/slack.png",
                slack: "",
                mobile: "",
                email: "",
                bio: "",
                position: "LEAD"
            }
        ],
        sectors: [
            {
                id: "0",
                name: "Real Estate",
                description: "Real Estate"
            },
            {
                id: "1",
                name: "Transportation",
                description: "Transportation"
            }
        ],
        headquarters: {
            id: "0",
            addressName: "Pete Jones",
            address1: "",
            address2: "",
            city: "",
            state: "",
            countryCodeISO: "",
            countryName: "USA",
            postal: ""
        },
        invested: 500000,
        totalValue: 1000000,
        MOIC: 0.3,
        irr: 0.1
    },
    {
        name: "Uber",
        logo: "assets/image/nauset.jpg",
        dealTeam: [
            {
                id: "0",
                companyName: "Uber",
                firstName: "Emily",
                lastName: "Madison",
                avatar: "assets/image/slack.png",
                slack: "",
                mobile: "",
                email: "",
                bio: "",
                position: "LEAD"
            }
        ],
        sectors: [
            {
                id: "0",
                name: "Transportation",
                description: "Transportation"
            },
            {
                id: "1",
                name: "Frontier Tech",
                description: "Frontier Tech"
            }
        ],
        headquarters: {
            id: "0",
            addressName: "Pete Jones",
            address1: "",
            address2: "",
            city: "",
            state: "",
            countryCodeISO: "",
            countryName: "USA",
            postal: ""
        },
        invested: 1000000,
        totalValue: 2000000,
        MOIC: 0.6,
        irr: 0.2
    }
];
