import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql(`
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media (id: $id, search: $search) {
            id
            title {
                romaji
                english
            }
            coverImage {
                extraLarge
            }
        }
    }
}
`);

export const GET_ANIME_BY_ID = gql(`
    query ($id: Int) {
        Media (id: $id) {
            id
            title {
                romaji
            }
            coverImage {
                extraLarge
            }
            description
            averageScore
            genres
        }
    }
`);
