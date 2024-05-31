

export const formatDate = (consultationDate: string) => {
    let formattedDate = consultationDate.split('/').reverse().join('/')
    return formattedDate
}