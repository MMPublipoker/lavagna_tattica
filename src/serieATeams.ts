import type { Formation } from './types';

export interface RealPlayer {
  nome: string;
  numero: number | null;
}

export interface RealTeam {
  id: string;
  nome: string;
  abbreviazione: string;
  moduloBase: Formation;
  colorePrimario: string;
  coloreSecondario: string;
  portieri: RealPlayer[];
  difensori: RealPlayer[];
  centrocampisti: RealPlayer[];
  attaccanti: RealPlayer[];
}

export const SERIE_A_TEAMS: RealTeam[] = [
  {
    "id": "atalanta",
    "nome": "Atalanta",
    "abbreviazione": "ATA",
    "moduloBase": "4-3-3",
    "colorePrimario": "#1E71B8",
    "coloreSecondario": "#000000",
    "portieri": [
      {
        "nome": "Marco Sportiello",
        "numero": 57
      },
      {
        "nome": "Marco Carnesecchi",
        "numero": 29
      },
      {
        "nome": "Paolo Vismara",
        "numero": 95
      }
    ],
    "difensori": [
      {
        "nome": "Davide Zappacosta",
        "numero": 77
      },
      {
        "nome": "Giorgio Scalvini",
        "numero": 42
      },
      {
        "nome": "Honest Ahanor",
        "numero": 69
      },
      {
        "nome": "Isak Hien",
        "numero": 4
      },
      {
        "nome": "Odilon Kossounou",
        "numero": 3
      },
      {
        "nome": "Matteo Plaia",
        "numero": 53
      },
      {
        "nome": "Raoul Bellanova",
        "numero": 16
      },
      {
        "nome": "Relja Obrić",
        "numero": 40
      },
      {
        "nome": "Sead Kolašinac",
        "numero": 23
      },
      {
        "nome": "Thomas Kristensen",
        "numero": 31
      }
    ],
    "centrocampisti": [
      {
        "nome": "Alberto Manzoni",
        "numero": 52
      },
      {
        "nome": "Charles De Ketelaere",
        "numero": 17
      },
      {
        "nome": "Éderson",
        "numero": 13
      },
      {
        "nome": "Federico Steffanoni",
        "numero": 44
      },
      {
        "nome": "Federico Cassa",
        "numero": 49
      },
      {
        "nome": "Gianluca Gaetano",
        "numero": 70
      },
      {
        "nome": "Ibrahim Sulemana",
        "numero": 6
      },
      {
        "nome": "Lazar Samardžić",
        "numero": 10
      },
      {
        "nome": "Lorenzo Bernasconi",
        "numero": 47
      },
      {
        "nome": "Mario Pašalić",
        "numero": 8
      },
      {
        "nome": "Marten de Roon",
        "numero": 15
      },
      {
        "nome": "Nicola Zalewski",
        "numero": 59
      },
      {
        "nome": "Sergej Levak",
        "numero": 46
      },
      {
        "nome": "Eljif Elmas",
        "numero": 99
      }
    ],
    "attaccanti": [
      {
        "nome": "Giacomo Raspadori",
        "numero": 18
      },
      {
        "nome": "Gianluca Scamacca",
        "numero": 9
      },
      {
        "nome": "Kamaldeen Sulemana",
        "numero": 7
      },
      {
        "nome": "Nikola Krstović",
        "numero": 90
      }
    ]
  },
  {
    "id": "bologna",
    "nome": "Bologna",
    "abbreviazione": "BOL",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#C8102E",
    "coloreSecondario": "#1B365D",
    "portieri": [
      {
        "nome": "Łukasz Skorupski",
        "numero": 1
      },
      {
        "nome": "Massimo Pessina",
        "numero": 25
      },
      {
        "nome": "Ukko Happonen",
        "numero": 72
      }
    ],
    "difensori": [
      {
        "nome": "Abdel Rahim Alhassane Bonkano",
        "numero": 23
      },
      {
        "nome": "Eivind Helland",
        "numero": 5
      },
      {
        "nome": "Emil Holm",
        "numero": 2
      },
      {
        "nome": "Juan Miranda",
        "numero": 33
      },
      {
        "nome": "Lorenzo De Silvestri",
        "numero": 29
      },
      {
        "nome": "Martin Vitík",
        "numero": 41
      },
      {
        "nome": "Nadir Zortea",
        "numero": 20
      },
      {
        "nome": "Nicolò Casale",
        "numero": 16
      },
      {
        "nome": "Torbjørn Heggem",
        "numero": 14
      }
    ],
    "centrocampisti": [
      {
        "nome": "Federico Bernardeschi",
        "numero": 10
      },
      {
        "nome": "Lewis Ferguson",
        "numero": 19
      },
      {
        "nome": "Mikel Jesús Amondarain",
        "numero": 8
      },
      {
        "nome": "Nikola Moro",
        "numero": 6
      },
      {
        "nome": "Oussama El Azzouzi",
        "numero": 17
      },
      {
        "nome": "Tommaso Pobega",
        "numero": 4
      }
    ],
    "attaccanti": [
      {
        "nome": "Artem Dovbyk",
        "numero": 9
      },
      {
        "nome": "Jens Odgaard",
        "numero": 21
      },
      {
        "nome": "Jonathan Rowe",
        "numero": 11
      },
      {
        "nome": "Nicolò Cambiaghi",
        "numero": 28
      },
      {
        "nome": "Riccardo Orsolini",
        "numero": 7
      },
      {
        "nome": "Roberto Piccoli",
        "numero": 91
      }
    ]
  },
  {
    "id": "cagliari",
    "nome": "Cagliari",
    "abbreviazione": "CAG",
    "moduloBase": "3-5-2",
    "colorePrimario": "#D71920",
    "coloreSecondario": "#1E3A66",
    "portieri": [
      {
        "nome": "Alen Sherri",
        "numero": 12
      },
      {
        "nome": "Boris Radunović",
        "numero": 23
      },
      {
        "nome": "Elia Caprile",
        "numero": 1
      }
    ],
    "difensori": [
      {
        "nome": "Adam Obert",
        "numero": 33
      },
      {
        "nome": "Gabriele Zappa",
        "numero": 28
      },
      {
        "nome": "Giuseppe Aurelio",
        "numero": 24
      },
      {
        "nome": "Zé Pedro",
        "numero": 2
      },
      {
        "nome": "Juan Rodríguez",
        "numero": 15
      },
      {
        "nome": "Raphael Kofler",
        "numero": 22
      },
      {
        "nome": "Riyad Idrissi",
        "numero": 3
      },
      {
        "nome": "Yerry Mina",
        "numero": 26
      }
    ],
    "centrocampisti": [
      {
        "nome": "Ademide Akarakiri",
        "numero": 30
      },
      {
        "nome": "Alessandro Deiola",
        "numero": 14
      },
      {
        "nome": "Alessandro Romano",
        "numero": 4
      },
      {
        "nome": "Daniel Maldini",
        "numero": 70
      },
      {
        "nome": "Harry Winks",
        "numero": 6
      },
      {
        "nome": "Ivan Sulev",
        "numero": 32
      },
      {
        "nome": "Jacopo Fazzini",
        "numero": 10
      },
      {
        "nome": "Joseph Liteta",
        "numero": 27
      },
      {
        "nome": "Matteo Prati",
        "numero": 16
      },
      {
        "nome": "Mattia Felici",
        "numero": 17
      },
      {
        "nome": "Michel Adopo",
        "numero": 8
      },
      {
        "nome": "Nicola Grandu",
        "numero": 36
      },
      {
        "nome": "Nicolò Cavuoti",
        "numero": 21
      }
    ],
    "attaccanti": [
      {
        "nome": "Agustín Albarracín",
        "numero": 20
      },
      {
        "nome": "Alieu Fadera",
        "numero": 39
      },
      {
        "nome": "Gennaro Borrelli",
        "numero": 29
      },
      {
        "nome": "Kevin Carlos",
        "numero": 9
      },
      {
        "nome": "Kingstone Mutandwa",
        "numero": 18
      },
      {
        "nome": "Paul Mendy",
        "numero": 31
      },
      {
        "nome": "Sebastiano Esposito",
        "numero": 94
      },
      {
        "nome": "Sebastiano Di Paolo",
        "numero": 25
      },
      {
        "nome": "Yael Trepy",
        "numero": 19
      }
    ]
  },
  {
    "id": "como",
    "nome": "Como",
    "abbreviazione": "COM",
    "moduloBase": "4-2-3-1",
    "colorePrimario": "#0057B8",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Emil Audero",
        "numero": 12
      },
      {
        "nome": "Jean Butez",
        "numero": 1
      },
      {
        "nome": "Mauro Vigorito",
        "numero": 22
      },
      {
        "nome": "Noel Törnqvist",
        "numero": 21
      }
    ],
    "difensori": [
      {
        "nome": "Alberto Dossena",
        "numero": 13
      },
      {
        "nome": "Álex Valle",
        "numero": 3
      },
      {
        "nome": "Cristiano De Paoli",
        "numero": 56
      },
      {
        "nome": "Edoardo Goldaniga",
        "numero": 18
      },
      {
        "nome": "Ignace Van der Brempt",
        "numero": 77
      },
      {
        "nome": "Ivan Smolčić",
        "numero": 28
      },
      {
        "nome": "Jacobo Ramón",
        "numero": 4
      },
      {
        "nome": "Kaiki Bruno",
        "numero": 16
      },
      {
        "nome": "Marc-Oliver Kempf",
        "numero": 2
      },
      {
        "nome": "Trevoh Chalobah",
        "numero": 99
      },
      {
        "nome": "Yan Couto",
        "numero": 27
      }
    ],
    "centrocampisti": [
      {
        "nome": "Adrian Lahdo",
        "numero": 15
      },
      {
        "nome": "Francesco Andrealli",
        "numero": 55
      },
      {
        "nome": "Lorenzo Bonsignori Goggi",
        "numero": 57
      },
      {
        "nome": "Lucas Da Cunha",
        "numero": 7
      },
      {
        "nome": "Luis Milla",
        "numero": 6
      },
      {
        "nome": "Martin Baturina",
        "numero": 20
      },
      {
        "nome": "Matteo Papaccioli",
        "numero": 54
      },
      {
        "nome": "Mattia Liberali",
        "numero": 30
      },
      {
        "nome": "Maxence Caqueret",
        "numero": 8
      },
      {
        "nome": "Máximo Perrone",
        "numero": 5
      },
      {
        "nome": "Nico Paz",
        "numero": 10
      },
      {
        "nome": "Riccardo Cassano",
        "numero": 49
      },
      {
        "nome": "Samuele Pisati",
        "numero": 58
      }
    ],
    "attaccanti": [
      {
        "nome": "Álvaro Morata",
        "numero": 23
      },
      {
        "nome": "Anastasios Douvikas",
        "numero": 9
      },
      {
        "nome": "Assane Diao",
        "numero": 11
      },
      {
        "nome": "Iván Azón",
        "numero": 90
      },
      {
        "nome": "Jayden Addai",
        "numero": 42
      },
      {
        "nome": "Jesús Rodríguez",
        "numero": 17
      },
      {
        "nome": "Nicolas Kühn",
        "numero": 19
      },
      {
        "nome": "Robin Thiland-Herard",
        "numero": 59
      }
    ]
  },
  {
    "id": "fiorentina",
    "nome": "Fiorentina",
    "abbreviazione": "FIO",
    "moduloBase": "4-3-3",
    "colorePrimario": "#5B2C83",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "David De Gea",
        "numero": 43
      },
      {
        "nome": "Luca Lezzerini",
        "numero": 19
      },
      {
        "nome": "Oliver Christensen",
        "numero": 53
      }
    ],
    "difensori": [
      {
        "nome": "Alejandro Jiménez",
        "numero": 20
      },
      {
        "nome": "Dodô",
        "numero": 2
      },
      {
        "nome": "Eman Košpo",
        "numero": 71
      },
      {
        "nome": "Fabiano Parisi",
        "numero": 65
      },
      {
        "nome": "João Mário",
        "numero": 17
      },
      {
        "nome": "Luca Ranieri",
        "numero": 6
      },
      {
        "nome": "Marin Pongračić",
        "numero": 5
      },
      {
        "nome": "Radu Drăgușin",
        "numero": 3
      },
      {
        "nome": "Víctor Valdepeñas",
        "numero": 21
      },
      {
        "nome": "Viery Fernandes Santos Lopes",
        "numero": 33
      }
    ],
    "centrocampisti": [
      {
        "nome": "Arthur Atta",
        "numero": 14
      },
      {
        "nome": "Cher Ndour",
        "numero": 27
      },
      {
        "nome": "Christ Inao Oulaï",
        "numero": 42
      },
      {
        "nome": "Giovanni Fabbian",
        "numero": 80
      },
      {
        "nome": "Marco Brescianini",
        "numero": 4
      },
      {
        "nome": "Nicolò Fagioli",
        "numero": 44
      },
      {
        "nome": "Rolando Mandragora",
        "numero": 8
      }
    ],
    "attaccanti": [
      {
        "nome": "Albert Guðmundsson",
        "numero": 11
      },
      {
        "nome": "Moise Kean",
        "numero": 9
      },
      {
        "nome": "Brando Mazzeo",
        "numero": 72
      },
      {
        "nome": "Federico Croci",
        "numero": 70
      },
      {
        "nome": "Franco Mastantuono",
        "numero": 30
      },
      {
        "nome": "Mateo Pellegrino",
        "numero": 32
      }
    ]
  },
  {
    "id": "frosinone",
    "nome": "Frosinone",
    "abbreviazione": "FRO",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#F5C400",
    "coloreSecondario": "#004B93",
    "portieri": [
      {
        "nome": "Lorenzo Palmisani",
        "numero": 22
      },
      {
        "nome": "Matteo Pisseri",
        "numero": 12
      },
      {
        "nome": "Sebastiano Desplanches",
        "numero": 91
      }
    ],
    "difensori": [
      {
        "nome": "Anthony Oyono",
        "numero": 20
      },
      {
        "nome": "Gabriele Bracaglia",
        "numero": 79
      },
      {
        "nome": "Gabriele Calvani",
        "numero": 3
      },
      {
        "nome": "Giorgio Cittadini",
        "numero": 2
      },
      {
        "nome": "Ilario Monterisi",
        "numero": 30
      },
      {
        "nome": "Jacopo Gelli",
        "numero": 6
      },
      {
        "nome": "Jeremy Oyono",
        "numero": 21
      },
      {
        "nome": "Kevin Akpoguma",
        "numero": 25
      },
      {
        "nome": "Niccolò Corrado",
        "numero": 19
      },
      {
        "nome": "Sergio Kalaj",
        "numero": 23
      },
      {
        "nome": "Wisdom Amey",
        "numero": 5
      },
      {
        "nome": "Omar Fayed",
        "numero": null
      },
      {
        "nome": "Aleksa Terzić",
        "numero": 71
      }
    ],
    "centrocampisti": [
      {
        "nome": "Ben Kone",
        "numero": 4
      },
      {
        "nome": "Alessio Zerbin",
        "numero": 24
      },
      {
        "nome": "Anouar El Azzouzi",
        "numero": 34
      },
      {
        "nome": "Filippo Grosso",
        "numero": 18
      },
      {
        "nome": "Florian Grillitsch",
        "numero": 27
      },
      {
        "nome": "Francesco Gelli",
        "numero": 96
      },
      {
        "nome": "Giacomo Calò",
        "numero": 14
      },
      {
        "nome": "Ilias Koutsoupias",
        "numero": 8
      },
      {
        "nome": "Kevin Barcella",
        "numero": 99
      },
      {
        "nome": "Luis Hasa",
        "numero": 70
      },
      {
        "nome": "Matteo Cichella",
        "numero": 16
      },
      {
        "nome": "Patrizio Masini",
        "numero": 73
      },
      {
        "nome": "Romano Schmid",
        "numero": 10
      }
    ],
    "attaccanti": [
      {
        "nome": "Alejandro Cichero",
        "numero": 29
      },
      {
        "nome": "Antonio Raimondo",
        "numero": 9
      },
      {
        "nome": "Fares Ghedjemis",
        "numero": 7
      },
      {
        "nome": "Giorgi Kvernadze",
        "numero": 17
      },
      {
        "nome": "Muhammed Colley",
        "numero": 42
      },
      {
        "nome": "Seydou Fini",
        "numero": 40
      }
    ]
  },
  {
    "id": "genoa",
    "nome": "Genoa",
    "abbreviazione": "GEN",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#C8102E",
    "coloreSecondario": "#001F3F",
    "portieri": [
      {
        "nome": "Daniele Sommariva",
        "numero": 39
      },
      {
        "nome": "Franz Stolz",
        "numero": 99
      },
      {
        "nome": "Justin Bijlow",
        "numero": 1
      }
    ],
    "difensori": [
      {
        "nome": "Aaron Martín",
        "numero": 3
      },
      {
        "nome": "Alan Matturro",
        "numero": 13
      },
      {
        "nome": "Alessandro Marcandalli",
        "numero": 27
      },
      {
        "nome": "Brooke Norton-Cuffy",
        "numero": 15
      },
      {
        "nome": "David Puczka",
        "numero": 31
      },
      {
        "nome": "Johan Vásquez",
        "numero": 22
      },
      {
        "nome": "Leo Østigård",
        "numero": 5
      },
      {
        "nome": "Lukas Klisys",
        "numero": 14
      },
      {
        "nome": "Mamedi Doucoure",
        "numero": 74
      },
      {
        "nome": "Marcelo Vaz",
        "numero": 85
      },
      {
        "nome": "Mario Mitaj",
        "numero": 2
      },
      {
        "nome": "Sebastian Otoa",
        "numero": 34
      },
      {
        "nome": "Stefano Sabelli",
        "numero": 20
      }
    ],
    "centrocampisti": [
      {
        "nome": "Alexsandro Amorim de Freitas",
        "numero": 4
      },
      {
        "nome": "Franz-Ethan Meichtry",
        "numero": 11
      },
      {
        "nome": "Hamed Traorè",
        "numero": 25
      },
      {
        "nome": "Mikael Ellertsson",
        "numero": 77
      },
      {
        "nome": "Mohameth Djibril Sow",
        "numero": 97
      },
      {
        "nome": "Morten Frendrup",
        "numero": 32
      },
      {
        "nome": "Samuel Wiafe",
        "numero": 71
      }
    ],
    "attaccanti": [
      {
        "nome": "Adam Žulevič",
        "numero": 80
      },
      {
        "nome": "Elias Havel",
        "numero": 17
      },
      {
        "nome": "Lorenzo Colombo",
        "numero": 29
      },
      {
        "nome": "Lorenzo Venturino",
        "numero": 76
      },
      {
        "nome": "Tommaso Baldanzi",
        "numero": 8
      },
      {
        "nome": "Vitinha",
        "numero": 9
      },
      {
        "nome": "Junior Messias",
        "numero": 10
      },
      {
        "nome": "Xheto Nuredini",
        "numero": 19
      }
    ]
  },
  {
    "id": "inter",
    "nome": "Inter",
    "abbreviazione": "INT",
    "moduloBase": "3-5-2",
    "colorePrimario": "#0057B8",
    "coloreSecondario": "#000000",
    "portieri": [
      {
        "nome": "Ivan Provedel",
        "numero": 49
      },
      {
        "nome": "Raffaele Di Gennaro",
        "numero": 12
      },
      {
        "nome": "Josep Martínez",
        "numero": 1
      }
    ],
    "difensori": [
      {
        "nome": "Djed Spence",
        "numero": 99
      },
      {
        "nome": "Alessandro Bastoni",
        "numero": 95
      },
      {
        "nome": "Federico Dimarco",
        "numero": 32
      },
      {
        "nome": "Yann Bisseck",
        "numero": 31
      },
      {
        "nome": "Carlos Augusto",
        "numero": 30
      },
      {
        "nome": "Benjamin Pavard",
        "numero": 28
      },
      {
        "nome": "Manuel Akanji",
        "numero": 25
      },
      {
        "nome": "John Stones",
        "numero": 6
      }
    ],
    "centrocampisti": [
      {
        "nome": "Nicolò Barella",
        "numero": 23
      },
      {
        "nome": "Henrikh Mkhitaryan",
        "numero": 22
      },
      {
        "nome": "Kristjan Asllani",
        "numero": 21
      },
      {
        "nome": "Hakan Çalhanoğlu",
        "numero": 20
      },
      {
        "nome": "Andy Diouf",
        "numero": 17
      },
      {
        "nome": "Luis Henrique",
        "numero": 11
      },
      {
        "nome": "Petar Sučić",
        "numero": 8
      },
      {
        "nome": "Piotr Zieliński",
        "numero": 7
      },
      {
        "nome": "Aleksandar Stanković",
        "numero": 5
      },
      {
        "nome": "Curtis Jones",
        "numero": null
      },
      {
        "nome": "Yanis Massolin",
        "numero": null
      }
    ],
    "attaccanti": [
      {
        "nome": "Pio Esposito",
        "numero": 94
      },
      {
        "nome": "Ange-Yoan Bonny",
        "numero": 14
      },
      {
        "nome": "Lautaro Martínez",
        "numero": 10
      },
      {
        "nome": "Marcus Thuram",
        "numero": 9
      }
    ]
  },
  {
    "id": "juventus",
    "nome": "Juventus",
    "abbreviazione": "JUV",
    "moduloBase": "4-2-3-1",
    "colorePrimario": "#000000",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Carlo Pinsoglio",
        "numero": 23
      },
      {
        "nome": "Guglielmo Vicario",
        "numero": 25
      },
      {
        "nome": "Mattia Perin",
        "numero": 1
      },
      {
        "nome": "Michele Di Gregorio",
        "numero": 16
      },
      {
        "nome": "Riccardo Radu",
        "numero": 40
      }
    ],
    "difensori": [
      {
        "nome": "Bremer",
        "numero": 3
      },
      {
        "nome": "Andrea Cambiaso",
        "numero": 20
      },
      {
        "nome": "Daniele Rugani",
        "numero": 24
      },
      {
        "nome": "Federico Gatti",
        "numero": 4
      },
      {
        "nome": "Jhon Lucumí",
        "numero": 26
      },
      {
        "nome": "Juan Cabal",
        "numero": 32
      },
      {
        "nome": "Lloyd Kelly",
        "numero": 6
      },
      {
        "nome": "Zeki Çelik",
        "numero": 2
      },
      {
        "nome": "Pierre Kalulu",
        "numero": 15
      }
    ],
    "centrocampisti": [
      {
        "nome": "Douglas Luiz",
        "numero": 12
      },
      {
        "nome": "Fabio Miretti",
        "numero": 21
      },
      {
        "nome": "Khéphren Thuram",
        "numero": 19
      },
      {
        "nome": "Manuel Locatelli",
        "numero": 5
      },
      {
        "nome": "Teun Koopmeiners",
        "numero": 8
      },
      {
        "nome": "Weston McKennie",
        "numero": 22
      }
    ],
    "attaccanti": [
      {
        "nome": "Arkadiusz Milik",
        "numero": 14
      },
      {
        "nome": "Edon Zhegrova",
        "numero": 11
      },
      {
        "nome": "Francisco Conceição",
        "numero": 7
      },
      {
        "nome": "Jérémie Boga",
        "numero": 13
      },
      {
        "nome": "Jonathan David",
        "numero": 30
      },
      {
        "nome": "Kenan Yıldız",
        "numero": 10
      },
      {
        "nome": "Kerim Alajbegović",
        "numero": 17
      },
      {
        "nome": "Nico González",
        "numero": 31
      },
      {
        "nome": "Jeff Ekhator",
        "numero": 18
      },
      {
        "nome": "Randal Kolo Muani",
        "numero": 9
      }
    ]
  },
  {
    "id": "lazio",
    "nome": "Lazio",
    "abbreviazione": "LAZ",
    "moduloBase": "4-3-3",
    "colorePrimario": "#87CEEB",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Christos Mandas",
        "numero": 35
      },
      {
        "nome": "Edoardo Motta",
        "numero": 40
      },
      {
        "nome": "Alessio Furlanetto",
        "numero": 55
      },
      {
        "nome": "Davide Renzetti",
        "numero": 47
      }
    ],
    "difensori": [
      {
        "nome": "Oliver Provstgaard",
        "numero": 25
      },
      {
        "nome": "Danilho Doekhi",
        "numero": 5
      },
      {
        "nome": "Josip Šutalo",
        "numero": 37
      },
      {
        "nome": "Alessio Romagnoli",
        "numero": 13
      },
      {
        "nome": "Patric",
        "numero": 4
      },
      {
        "nome": "Samuel Gigot",
        "numero": 2
      },
      {
        "nome": "Filipe Bordon",
        "numero": 76
      },
      {
        "nome": "Nuno Tavares",
        "numero": 17
      },
      {
        "nome": "Luca Pellegrini",
        "numero": 3
      },
      {
        "nome": "Alfonso Pedraza",
        "numero": 23
      },
      {
        "nome": "Mohamed Fares",
        "numero": null
      },
      {
        "nome": "Romano Floriani Mussolini",
        "numero": 15
      },
      {
        "nome": "Adam Marušić",
        "numero": 77
      },
      {
        "nome": "Manuel Lazzari",
        "numero": 29
      }
    ],
    "centrocampisti": [
      {
        "nome": "Nicolò Rovella",
        "numero": 6
      },
      {
        "nome": "Reda Belahyane",
        "numero": 21
      },
      {
        "nome": "Danilo Cataldi",
        "numero": 32
      },
      {
        "nome": "Kenneth Taylor",
        "numero": 24
      },
      {
        "nome": "Davide Frattesi",
        "numero": 16
      },
      {
        "nome": "Fisayo Dele-Bashiru",
        "numero": 7
      },
      {
        "nome": "Bruno Galassi",
        "numero": 8
      },
      {
        "nome": "Valerio Farcomeni",
        "numero": 71
      },
      {
        "nome": "Adrian Przyborek",
        "numero": 28
      }
    ],
    "attaccanti": [
      {
        "nome": "Mattia Zaccagni",
        "numero": 10
      },
      {
        "nome": "Gustav Isaksen",
        "numero": 11
      },
      {
        "nome": "Tijjani Noslin",
        "numero": 14
      },
      {
        "nome": "Matteo Cancellieri",
        "numero": 22
      },
      {
        "nome": "Petar Ratkov",
        "numero": 20
      },
      {
        "nome": "Boulaye Dia",
        "numero": 19
      },
      {
        "nome": "Gabriele Artistico",
        "numero": 18
      },
      {
        "nome": "Federico Serra",
        "numero": 63
      }
    ]
  },
  {
    "id": "lecce",
    "nome": "Lecce",
    "abbreviazione": "LEC",
    "moduloBase": "4-3-3",
    "colorePrimario": "#FFD100",
    "coloreSecondario": "#C8102E",
    "portieri": [
      {
        "nome": "Wladimiro Falcone",
        "numero": 30
      },
      {
        "nome": "Marco Bleve",
        "numero": 1
      },
      {
        "nome": "Alexandru Borbei",
        "numero": null
      },
      {
        "nome": "Plamen Penev",
        "numero": 33
      }
    ],
    "difensori": [
      {
        "nome": "Tiago Gabriel",
        "numero": 44
      },
      {
        "nome": "Jamil Siebert",
        "numero": 5
      },
      {
        "nome": "Gaspar",
        "numero": 4
      },
      {
        "nome": "Gaby Jean",
        "numero": 18
      },
      {
        "nome": "Sebastian Esposito",
        "numero": null
      },
      {
        "nome": "Antonino Gallo",
        "numero": 25
      },
      {
        "nome": "Corrie Ndaba",
        "numero": 3
      },
      {
        "nome": "Vernon Addo",
        "numero": null
      },
      {
        "nome": "Danilo Veiga",
        "numero": 17
      },
      {
        "nome": "Christ-Owen Kouassi",
        "numero": 21
      },
      {
        "nome": "Marlon Ubani",
        "numero": 36
      }
    ],
    "centrocampisti": [
      {
        "nome": "Oumar Ngom",
        "numero": 79
      },
      {
        "nome": "Sadik Fofana",
        "numero": 8
      },
      {
        "nome": "Niko Kovač",
        "numero": 80
      },
      {
        "nome": "Olaf Gorter",
        "numero": 28
      },
      {
        "nome": "Medon Berisha",
        "numero": 10
      },
      {
        "nome": "Mohamed Kaba",
        "numero": 77
      },
      {
        "nome": "Lassana Coulibaly",
        "numero": 29
      },
      {
        "nome": "Youssef Maleh",
        "numero": 14
      },
      {
        "nome": "Omri Gandelman",
        "numero": 16
      }
    ],
    "attaccanti": [
      {
        "nome": "Santiago Pierotti",
        "numero": 50
      },
      {
        "nome": "Konan N'Dri",
        "numero": 11
      },
      {
        "nome": "Hjalte Lærke",
        "numero": 34
      },
      {
        "nome": "Willem Geubbels",
        "numero": 69
      },
      {
        "nome": "Nikola Štulić",
        "numero": 9
      },
      {
        "nome": "Milos Jovic",
        "numero": null
      },
      {
        "nome": "Paco Esteban",
        "numero": 22
      }
    ]
  },
  {
    "id": "milan",
    "nome": "Milan",
    "abbreviazione": "MIL",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#D00027",
    "coloreSecondario": "#000000",
    "portieri": [
      {
        "nome": "Mike Maignan",
        "numero": 16
      },
      {
        "nome": "Pietro Terracciano",
        "numero": 1
      },
      {
        "nome": "Lorenzo Torriani",
        "numero": 96
      }
    ],
    "difensori": [
      {
        "nome": "Strahinja Pavlović",
        "numero": 31
      },
      {
        "nome": "Mario Gila",
        "numero": 34
      },
      {
        "nome": "Koni De Winter",
        "numero": 5
      },
      {
        "nome": "Fikayo Tomori",
        "numero": null
      },
      {
        "nome": "Matteo Gabbia",
        "numero": 46
      },
      {
        "nome": "Filippo Terracciano",
        "numero": 42
      },
      {
        "nome": "Sankhoun Diawara",
        "numero": 13
      },
      {
        "nome": "Davide Bartesaghi",
        "numero": 33
      },
      {
        "nome": "Pervis Estupiñán",
        "numero": 2
      }
    ],
    "centrocampisti": [
      {
        "nome": "Ardon Jashari",
        "numero": 30
      },
      {
        "nome": "Youssouf Fofana",
        "numero": null
      },
      {
        "nome": "Samuele Ricci",
        "numero": 4
      },
      {
        "nome": "Adrien Rabiot",
        "numero": 12
      },
      {
        "nome": "Yunus Musah",
        "numero": 80
      },
      {
        "nome": "Ruben Loftus-Cheek",
        "numero": 8
      },
      {
        "nome": "Warren Bondo",
        "numero": null
      },
      {
        "nome": "Christian Comotto",
        "numero": 28
      },
      {
        "nome": "Luka Modrić",
        "numero": 14
      },
      {
        "nome": "Alexis Saelemaekers",
        "numero": 56
      },
      {
        "nome": "Diego Moreira",
        "numero": 22
      },
      {
        "nome": "Alphadjo Cissè",
        "numero": 70
      }
    ],
    "attaccanti": [
      {
        "nome": "Rafael Leão",
        "numero": 10
      },
      {
        "nome": "Christian Pulisic",
        "numero": 11
      },
      {
        "nome": "Samuel Chukwueze",
        "numero": 21
      },
      {
        "nome": "Gonçalo Ramos",
        "numero": 9
      },
      {
        "nome": "Christopher Nkunku",
        "numero": null
      },
      {
        "nome": "Santiago Giménez",
        "numero": null
      },
      {
        "nome": "Francesco Camarda",
        "numero": 73
      }
    ]
  },
  {
    "id": "monza",
    "nome": "Monza",
    "abbreviazione": "MON",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#E30613",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Demba Thiam",
        "numero": 20
      },
      {
        "nome": "Semuel Pizzignacco",
        "numero": 13
      },
      {
        "nome": "Aljaž Strajnar",
        "numero": 43
      }
    ],
    "difensori": [
      {
        "nome": "Lorenzo Lucchesi",
        "numero": 3
      },
      {
        "nome": "Andrea Carboni",
        "numero": 44
      },
      {
        "nome": "Eddy Kouadio",
        "numero": 60
      },
      {
        "nome": "Valentin Antov",
        "numero": 6
      },
      {
        "nome": "Filippo Delli Carri",
        "numero": 15
      },
      {
        "nome": "Ricardo Mangas",
        "numero": 7
      },
      {
        "nome": "Samuele Birindelli",
        "numero": 19
      },
      {
        "nome": "Adam Bakoune",
        "numero": 24
      }
    ],
    "centrocampisti": [
      {
        "nome": "Leonardo Colombo",
        "numero": 21
      },
      {
        "nome": "Ebenezer Akinsanmiro",
        "numero": 14
      },
      {
        "nome": "Matteo Pessina",
        "numero": 32
      },
      {
        "nome": "Mathis Mout",
        "numero": 80
      },
      {
        "nome": "Alessandro Berretta",
        "numero": 30
      },
      {
        "nome": "Idrissa Touré",
        "numero": 27
      },
      {
        "nome": "Patrick Ciurria",
        "numero": 26
      },
      {
        "nome": "Andrea Colpani",
        "numero": 28
      },
      {
        "nome": "Foe Ondoa",
        "numero": 8
      },
      {
        "nome": "Nicolas Galazzi",
        "numero": 23
      }
    ],
    "attaccanti": [
      {
        "nome": "Jay Robinson",
        "numero": 46
      },
      {
        "nome": "Keita Baldé",
        "numero": 17
      },
      {
        "nome": "Omari Forson",
        "numero": 11
      },
      {
        "nome": "Kevin Martins",
        "numero": 70
      },
      {
        "nome": "Patrick Cutrone",
        "numero": 10
      },
      {
        "nome": "Gustavo Varela",
        "numero": 9
      },
      {
        "nome": "Dany Mota",
        "numero": 47
      },
      {
        "nome": "Solomon Loubao",
        "numero": 22
      }
    ]
  },
  {
    "id": "napoli",
    "nome": "Napoli",
    "abbreviazione": "NAP",
    "moduloBase": "4-3-3",
    "colorePrimario": "#00AEEF",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Vanja Milinković-Savić",
        "numero": 32
      },
      {
        "nome": "Alex Meret",
        "numero": 1
      },
      {
        "nome": "Nikita Contini",
        "numero": 14
      }
    ],
    "difensori": [
      {
        "nome": "Alessandro Buongiorno",
        "numero": 4
      },
      {
        "nome": "Sam Beukema",
        "numero": 31
      },
      {
        "nome": "Benoît Badiashile",
        "numero": 5
      },
      {
        "nome": "Rafa Marín",
        "numero": 16
      },
      {
        "nome": "Amir Rrahmani",
        "numero": 13
      },
      {
        "nome": "Luca Marianucci",
        "numero": 35
      },
      {
        "nome": "Nosa Obaretin",
        "numero": 28
      },
      {
        "nome": "Christian Garofalo",
        "numero": 47
      },
      {
        "nome": "Mathías Olivera",
        "numero": 17
      },
      {
        "nome": "Leonardo Spinazzola",
        "numero": 37
      },
      {
        "nome": "Giovanni Di Lorenzo",
        "numero": 22
      },
      {
        "nome": "Pasquale Mazzocchi",
        "numero": 30
      }
    ],
    "centrocampisti": [
      {
        "nome": "Billy Gilmour",
        "numero": 6
      },
      {
        "nome": "Stanislav Lobotka",
        "numero": 68
      },
      {
        "nome": "Jens Cajuste",
        "numero": null
      },
      {
        "nome": "Scott McTominay",
        "numero": 8
      },
      {
        "nome": "Frank Anguissa",
        "numero": 99
      },
      {
        "nome": "Michael Folorunsho",
        "numero": 90
      },
      {
        "nome": "Costantino Favasuli",
        "numero": 2
      },
      {
        "nome": "Antonio Vergara",
        "numero": 26
      },
      {
        "nome": "Kevin De Bruyne",
        "numero": 11
      }
    ],
    "attaccanti": [
      {
        "nome": "Alisson Santos",
        "numero": 27
      },
      {
        "nome": "Noa Lang",
        "numero": 70
      },
      {
        "nome": "David Neres",
        "numero": 7
      },
      {
        "nome": "Cyril Ngonge",
        "numero": null
      },
      {
        "nome": "Matteo Politano",
        "numero": 21
      },
      {
        "nome": "Jesper Lindstrøm",
        "numero": 29
      },
      {
        "nome": "Rasmus Højlund",
        "numero": 19
      },
      {
        "nome": "Lorenzo Lucca",
        "numero": 20
      },
      {
        "nome": "Giovane",
        "numero": 23
      },
      {
        "nome": "Walid Cheddira",
        "numero": 15
      }
    ]
  },
  {
    "id": "parma",
    "nome": "Parma",
    "abbreviazione": "PAR",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#FFD500",
    "coloreSecondario": "#003E7E",
    "portieri": [
      {
        "nome": "Alessandro Mazzocchi",
        "numero": 75
      },
      {
        "nome": "Edoardo Corvi",
        "numero": 40
      },
      {
        "nome": "Giovanni Daffara",
        "numero": 30
      },
      {
        "nome": "Manuel Zambelli",
        "numero": 67
      }
    ],
    "difensori": [
      {
        "nome": "Abdoulaye Ndiaye",
        "numero": 3
      },
      {
        "nome": "Dominik Drobnic",
        "numero": 72
      },
      {
        "nome": "Emanuele Valeri",
        "numero": 14
      },
      {
        "nome": "Enrico Delprato",
        "numero": 15
      },
      {
        "nome": "Franco Carboni",
        "numero": 29
      },
      {
        "nome": "Lautaro Valenti",
        "numero": 5
      },
      {
        "nome": "Mariano Troilo",
        "numero": 37
      },
      {
        "nome": "Sascha Britschgi",
        "numero": 27
      }
    ],
    "centrocampisti": [
      {
        "nome": "Abdou-Salam Konaté",
        "numero": 47
      },
      {
        "nome": "Adrián Bernabé",
        "numero": 10
      },
      {
        "nome": "Antoine Joujou",
        "numero": 77
      },
      {
        "nome": "Benjamin Cremaschi",
        "numero": 8
      },
      {
        "nome": "Christian Ordóñez",
        "numero": 32
      },
      {
        "nome": "Hans Nicolussi Caviglia",
        "numero": 41
      },
      {
        "nome": "Mandela Keita",
        "numero": 16
      },
      {
        "nome": "Oliver Sørensen",
        "numero": 24
      },
      {
        "nome": "Rachid Kouda",
        "numero": 80
      }
    ],
    "attaccanti": [
      {
        "nome": "El Bilal Touré",
        "numero": 19
      },
      {
        "nome": "Matija Frigan",
        "numero": 20
      },
      {
        "nome": "Nesta Elphege",
        "numero": 23
      },
      {
        "nome": "Ousmane Diallo",
        "numero": 7
      },
      {
        "nome": "Pontus Almqvist",
        "numero": 11
      },
      {
        "nome": "Simone Lontani",
        "numero": 76
      }
    ]
  },
  {
    "id": "roma",
    "nome": "Roma",
    "abbreviazione": "ROM",
    "moduloBase": "3-4-2-1",
    "colorePrimario": "#8E1F2F",
    "coloreSecondario": "#F5A623",
    "portieri": [
      {
        "nome": "Alessio Marcaccini",
        "numero": 73
      },
      {
        "nome": "Giorgio De Marzi",
        "numero": 70
      },
      {
        "nome": "Mile Svilar",
        "numero": 99
      },
      {
        "nome": "Pierluigi Gollini",
        "numero": 95
      }
    ],
    "difensori": [
      {
        "nome": "Anass Salah-Eddine",
        "numero": 34
      },
      {
        "nome": "Daniele Ghilardi",
        "numero": 87
      },
      {
        "nome": "Devyne Rensch",
        "numero": 2
      },
      {
        "nome": "Emanuele Lulli",
        "numero": 77
      },
      {
        "nome": "Gianluca Mancini",
        "numero": 23
      },
      {
        "nome": "Jan Ziółkowski",
        "numero": 24
      },
      {
        "nome": "Konstantinos Koulierakis",
        "numero": 3
      },
      {
        "nome": "Mario Hermoso",
        "numero": 22
      },
      {
        "nome": "Nahuel Molina",
        "numero": 20
      },
      {
        "nome": "Evan Ndicka",
        "numero": 5
      },
      {
        "nome": "Wesley",
        "numero": 43
      }
    ],
    "centrocampisti": [
      {
        "nome": "Bryan Cristante",
        "numero": 4
      },
      {
        "nome": "Manu Koné",
        "numero": 17
      },
      {
        "nome": "Lorenzo Pellegrini",
        "numero": 7
      },
      {
        "nome": "Neil El Aynaoui",
        "numero": 8
      },
      {
        "nome": "Niccolò Pisilli",
        "numero": 61
      },
      {
        "nome": "Rodrigo Mora",
        "numero": 86
      }
    ],
    "attaccanti": [
      {
        "nome": "Antonio Arena",
        "numero": 68
      },
      {
        "nome": "Donyell Malen",
        "numero": 14
      },
      {
        "nome": "Matías Soulé",
        "numero": 18
      },
      {
        "nome": "Paulo Dybala",
        "numero": 21
      },
      {
        "nome": "Robinio Vaz",
        "numero": 78
      },
      {
        "nome": "Santiago Castro",
        "numero": 9
      }
    ]
  },
  {
    "id": "sassuolo",
    "nome": "Sassuolo",
    "abbreviazione": "SAS",
    "moduloBase": "4-3-3",
    "colorePrimario": "#00A651",
    "coloreSecondario": "#000000",
    "portieri": [
      {
        "nome": "Arijanet Murić",
        "numero": 49
      },
      {
        "nome": "Stefano Turati",
        "numero": 80
      },
      {
        "nome": "Giacomo Satalino",
        "numero": 12
      },
      {
        "nome": "Lorenzo Nyarko",
        "numero": 22
      }
    ],
    "difensori": [
      {
        "nome": "Jay Idzes",
        "numero": 21
      },
      {
        "nome": "Fedde Leysen",
        "numero": null
      },
      {
        "nome": "Fali Candé",
        "numero": 5
      },
      {
        "nome": "Cas Odenthal",
        "numero": 26
      },
      {
        "nome": "Alessandro Di Bitonto",
        "numero": 23
      },
      {
        "nome": "Giorgio Vezzosi",
        "numero": 36
      },
      {
        "nome": "Tommaso Macchioni",
        "numero": 31
      },
      {
        "nome": "Rafa Obrador",
        "numero": 33
      },
      {
        "nome": "Josh Doig",
        "numero": 3
      },
      {
        "nome": "Edoardo Pieragnolo",
        "numero": 15
      },
      {
        "nome": "Sebastian Walukiewicz",
        "numero": 6
      },
      {
        "nome": "Filippo Missori",
        "numero": 2
      },
      {
        "nome": "Yeferson Paz",
        "numero": 27
      }
    ],
    "centrocampisti": [
      {
        "nome": "Luca Lipani",
        "numero": 35
      },
      {
        "nome": "Daniel Boloca",
        "numero": 11
      },
      {
        "nome": "Nemanja Matić",
        "numero": 18
      },
      {
        "nome": "Andrea Ghion",
        "numero": 8
      },
      {
        "nome": "Ismaël Koné",
        "numero": 90
      },
      {
        "nome": "Kristian Thorstvedt",
        "numero": 42
      },
      {
        "nome": "Edoardo Iannoni",
        "numero": 44
      },
      {
        "nome": "Fabrizio Caligara",
        "numero": null
      },
      {
        "nome": "Simone Cinquegrano",
        "numero": 46
      },
      {
        "nome": "Cristian Volpato",
        "numero": 7
      },
      {
        "nome": "Vasilije Adžić",
        "numero": 17
      },
      {
        "nome": "Darryl Bakola",
        "numero": 50
      }
    ],
    "attaccanti": [
      {
        "nome": "Armand Laurienté",
        "numero": 45
      },
      {
        "nome": "Benja Domínguez",
        "numero": 25
      },
      {
        "nome": "Riccardo Ciervo",
        "numero": 20
      },
      {
        "nome": "Patrick Nuamah",
        "numero": 30
      },
      {
        "nome": "Domenico Berardi",
        "numero": 10
      },
      {
        "nome": "Nicholas Pierini",
        "numero": 77
      },
      {
        "nome": "Andrea Pinamonti",
        "numero": 99
      },
      {
        "nome": "Kieron Bowie",
        "numero": 9
      },
      {
        "nome": "Laurs Skjellerup",
        "numero": null
      }
    ]
  },
  {
    "id": "torino",
    "nome": "Torino",
    "abbreviazione": "TOR",
    "moduloBase": "4-3-3",
    "colorePrimario": "#7A263A",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Alberto Paleari",
        "numero": 1
      },
      {
        "nome": "Alessio Vaggelli",
        "numero": 97
      },
      {
        "nome": "Diego Mascardi",
        "numero": 26
      },
      {
        "nome": "Franco Israel",
        "numero": 81
      },
      {
        "nome": "Lapo Siviero",
        "numero": 76
      }
    ],
    "difensori": [
      {
        "nome": "Ali Dembélé",
        "numero": 21
      },
      {
        "nome": "Ardian Ismajli",
        "numero": 44
      },
      {
        "nome": "Come Bianay Balcot",
        "numero": 80
      },
      {
        "nome": "Cristiano Biraghi",
        "numero": 3
      },
      {
        "nome": "Eray Cömert",
        "numero": 5
      },
      {
        "nome": "Luca Angelucci",
        "numero": 25
      },
      {
        "nome": "Manuel Carrascosa",
        "numero": 63
      },
      {
        "nome": "Marcus Pedersen",
        "numero": 16
      },
      {
        "nome": "Pietro Comuzzo",
        "numero": 15
      },
      {
        "nome": "Saúl Coco",
        "numero": 23
      }
    ],
    "centrocampisti": [
      {
        "nome": "Alessio Cacciamani",
        "numero": 77
      },
      {
        "nome": "Andrea Ballanti",
        "numero": 94
      },
      {
        "nome": "Cesare Casadei",
        "numero": 22
      },
      {
        "nome": "Emirhan İlkhan",
        "numero": 6
      },
      {
        "nome": "Faustino Anjorin",
        "numero": 14
      },
      {
        "nome": "Gvidas Gineitis",
        "numero": 66
      },
      {
        "nome": "Ivan Ilić",
        "numero": 8
      },
      {
        "nome": "Kian Fitz-Jim",
        "numero": 28
      },
      {
        "nome": "Marco Dalla Vecchia",
        "numero": 27
      },
      {
        "nome": "Massimiliano Miccoli",
        "numero": 79
      },
      {
        "nome": "Nikola Vlašić",
        "numero": 10
      },
      {
        "nome": "Zalan Kugyela",
        "numero": 96
      }
    ],
    "attaccanti": [
      {
        "nome": "Alieu Njie",
        "numero": 92
      },
      {
        "nome": "Che Adams",
        "numero": 19
      },
      {
        "nome": "Duván Zapata",
        "numero": 91
      },
      {
        "nome": "Gaetano Oristanio",
        "numero": 11
      },
      {
        "nome": "Giovanni Simeone",
        "numero": 18
      },
      {
        "nome": "Pietro Pellegri",
        "numero": 9
      },
      {
        "nome": "Sandro Kulenović",
        "numero": 17
      },
      {
        "nome": "Tommaso Gabellini",
        "numero": 86
      },
      {
        "nome": "Zakaria Aboukhlal",
        "numero": 7
      }
    ]
  },
  {
    "id": "udinese",
    "nome": "Udinese",
    "abbreviazione": "UDI",
    "moduloBase": "3-5-2",
    "colorePrimario": "#000000",
    "coloreSecondario": "#FFFFFF",
    "portieri": [
      {
        "nome": "Maduka Okoye",
        "numero": 40
      },
      {
        "nome": "Edoardo Piana",
        "numero": 99
      },
      {
        "nome": "Daniele Padelli",
        "numero": 93
      }
    ],
    "difensori": [
      {
        "nome": "Oumar Solet",
        "numero": 28
      },
      {
        "nome": "Nicolò Bertola",
        "numero": 13
      },
      {
        "nome": "Matteo Palma",
        "numero": 16
      },
      {
        "nome": "Branimir Mlačić",
        "numero": 22
      },
      {
        "nome": "Saba Goglichidze",
        "numero": 2
      },
      {
        "nome": "James Abankwah",
        "numero": 14
      },
      {
        "nome": "Enzo Ebosse",
        "numero": 77
      },
      {
        "nome": "Christian Kabasele",
        "numero": 27
      },
      {
        "nome": "Hassane Kamara",
        "numero": 11
      },
      {
        "nome": "Alessandro Zanoli",
        "numero": 59
      },
      {
        "nome": "Mërgim Vojvoda",
        "numero": 23
      }
    ],
    "centrocampisti": [
      {
        "nome": "Jesper Karlström",
        "numero": 8
      },
      {
        "nome": "Jurgen Ekkelenkamp",
        "numero": 32
      },
      {
        "nome": "Lennon Miller",
        "numero": 38
      },
      {
        "nome": "Jakub Piotrowski",
        "numero": 24
      },
      {
        "nome": "Sandi Lovrić",
        "numero": 4
      },
      {
        "nome": "Oier Zarraga",
        "numero": 6
      },
      {
        "nome": "Rui Modesto",
        "numero": null
      },
      {
        "nome": "Juan Arizala",
        "numero": 20
      },
      {
        "nome": "Unai Gómez",
        "numero": 46
      },
      {
        "nome": "Giorgi Chakvetadze",
        "numero": 30
      },
      {
        "nome": "David Pejičić",
        "numero": 79
      }
    ],
    "attaccanti": [
      {
        "nome": "Nicolò Zaniolo",
        "numero": 10
      },
      {
        "nome": "Keinan Davis",
        "numero": 9
      },
      {
        "nome": "Idrissa Gueye",
        "numero": 7
      },
      {
        "nome": "Vakoun Bayo",
        "numero": 15
      },
      {
        "nome": "Giulio Vinciati",
        "numero": 45
      }
    ]
  },
  {
    "id": "venezia",
    "nome": "Venezia",
    "abbreviazione": "VEN",
    "moduloBase": "3-5-2",
    "colorePrimario": "#F28C28",
    "coloreSecondario": "#006B54",
    "portieri": [
      {
        "nome": "Matteo Grandi",
        "numero": null
      },
      {
        "nome": "Lorenzo Montipò",
        "numero": null
      },
      {
        "nome": "Alessio Pozzi",
        "numero": null
      },
      {
        "nome": "Filip Stanković",
        "numero": null
      }
    ],
    "difensori": [
      {
        "nome": "Armel Bella-Kotchap",
        "numero": null
      },
      {
        "nome": "Thierry Rendall Correia",
        "numero": null
      },
      {
        "nome": "Bartol Franjić",
        "numero": null
      },
      {
        "nome": "Alejandro Gomes Furtado",
        "numero": null
      },
      {
        "nome": "Redouane Halhal",
        "numero": null
      },
      {
        "nome": "Ridgeciano Haps",
        "numero": null
      },
      {
        "nome": "Richie Sagrado",
        "numero": null
      },
      {
        "nome": "Joel Schingtienne",
        "numero": null
      }
    ],
    "centrocampisti": [
      {
        "nome": "Toma Bašić",
        "numero": null
      },
      {
        "nome": "Gianluca Busio",
        "numero": null
      },
      {
        "nome": "Matteo Dagasso",
        "numero": null
      },
      {
        "nome": "Lamine Fanne",
        "numero": null
      },
      {
        "nome": "Marko Farji",
        "numero": null
      },
      {
        "nome": "Antoine Hainaut",
        "numero": null
      },
      {
        "nome": "Thórir Helgason",
        "numero": null
      },
      {
        "nome": "Kornel Lisman",
        "numero": null
      },
      {
        "nome": "Simone Panada",
        "numero": null
      },
      {
        "nome": "Kike Pérez",
        "numero": null
      },
      {
        "nome": "Simon Sohm",
        "numero": null
      }
    ],
    "attaccanti": [
      {
        "nome": "Akor Adams",
        "numero": null
      },
      {
        "nome": "Lion Lauberbach",
        "numero": null
      },
      {
        "nome": "Alvin Okoro",
        "numero": null
      },
      {
        "nome": "Albion Rrahmani",
        "numero": null
      },
      {
        "nome": "John Yeboah",
        "numero": null
      }
    ]
  }
];
