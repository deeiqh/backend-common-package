/*
import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import JsonToTS from 'json-to-ts';
import { UserProps } from '../domain/user';

import {DomainProps}

export async function domainDtoFactory(): Promise<void> {
  const domain: Record<string, any> = new DomainProps();
  const domainName = DomainProps.name.replace('Props', '');


  const user: Record<string, any> = new UserProps();

  const sample: Record<string, any> = {};

  for (const property of Object.keys(user)) {
    const entries = Object.entries(user[property]);

    if (entries.length === 1) {
      sample[property] = entries[0][1];
    } else {
      sample[property] = user[property];
    }
  }

  let content = '';

  const interfaces = JsonToTS(sample);
  interfaces[0] = interfaces[0].replace('RootObject', `${domainName}Dto`);
  interfaces[0] = interfaces[0].replace('interface', `export class`);
  interfaces.map(
    (_interface) =>
      (content += `${_interface
        .replace(/undefined/g, 'any')
        .replace(/interface/g, 'export class')
        .replace(/:/g, '?:')}\n`),
  );

  await fs.writeFile(
    `/home/deeiqh/Documents/hapi/@hapi-corp/hapi-corp-backend-common-package/src/events-payload/dtos/domain/user.dto.ts`,
    content,
  );

  const logger = new Logger('dtoFactory');
  logger.log(`${domainName}Dto created`);
};
*/

// select service repo > service domain interfaces, which one you want
//     git clone? to get files. get domain folder get interface files get filenameProps interfaces
//       but hoy to simplify property types -> go to propertynameProps
//   but the interfac should have just the payload properties
//     the param decorator do the trick, receive complete interfac and parce required ones

// who run the method
//   someone want to update the user interface, go here and run the query (graph or rest)

// el payload viene con value, props. no problem, ahi se corre el reducePayload. el asunto es
// que la interfaz venga con los props recortados y que se instance to class para que quede la
// interfazlimpia

// parse file to delete lines wich contain Result< and { Result }

// el Props que se agraga el user por ejm userProps que sea default ya si es raro que sea input
// explicito en el metodo

// iterar en la instancia de la interfaz hasta que typeof sea primitivo, ir armando la nueva intrz
//   o en lugar de hacer esto se podria entrar al type de la prop y tomar las porperties de typeProps
//     si es una cancelarla y tomar solo su typeof si son varias se toman todas
//     si no se puede acceder al typeProps porque es privado se sobrescrive con el regex el 'export'
//       porque estamos trabajando sobre una copia, no hay problema

//       let z: UserProps;
//       z.id.id;
//       z.documents.backDocument;
//       const a = typeof z.status.props.status;
//       import { UserStatusProps } from '../user-status';

//       let ab: UserStatusProps;
//       ab.status

//       for properties of UserProps
//         import UserPropertyProps from

//         append property: typeof porperty if UserPropertyProps has only one
//         append property: {all properties} if many porps they are prmitive

// al final de todo se hace remove a la carpeta domain para que todo ese codigo no quede como spam

//if enum do it as string
//some of them has export other not, add export. some of them has a I before interface name, deleteI
//delete user repo file
//delete user.ts
//add Props to properties of user.interface.ts, it will generate auto fix of imports. except if is primitive as boolean

//in template write the import and the type. it generate content of dto.factory.ts
//    the template function also parse and format the domain folder, so dtoFactory has all clean
//      assign undefined to get property names later

//change interface to class in user.interface.ts and assign new prperty prop, if boolean set false
//change interface to class all props files, and assign value to primitive types

//json to interface: replace rootobject with DomainProps, replace undefined con any
