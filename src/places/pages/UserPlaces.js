import PlaceList from "../components/PlaceList";
import { useParams } from 'react-router-dom';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    coordinates: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    creator: 'u1',
    url: 'https://picsum.photos/200'
  },
  {
    id: 'p2',
    title: 'Empire',
    description: 'O2',
    coordinates: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    creator: 'u2',
    url: 'https://picsum.photos/200'
  },
  {
    id: 'p3',
    title: 'State ',
    description: '3',
    coordinates: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    creator: 'u3',
    url: 'https://picsum.photos/200'
  }
];

function UserPlaces(props) {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;