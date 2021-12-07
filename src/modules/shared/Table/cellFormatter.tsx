import { DateFr, DateFrHrWithTime } from '../DateToFrench';
export const dateFormatter = (cell: any, row: any) => {
  return <div>{DateFrHrWithTime(cell)} </div>;
};

export const dateFormatterNoTime = (cell: any, row: any) => {
  return <div>{DateFr(cell)} </div>;
};

export const patientNameFormatter = (cell: any, row: any) => {
  let patient =
    row?.patient || row?.quittance?.patient || row?.dossier.patient || row;
  return <span>{`${patient.nom} ${patient.prenom}`} </span>;
};
