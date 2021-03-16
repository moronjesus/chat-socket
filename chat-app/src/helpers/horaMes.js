import moment from 'moment'

export const horaMes = ( fecha ) =>{

    const horaMes = moment( fecha );
    
    return horaMes.format('HH:mm a | MMMM Do ');   

}