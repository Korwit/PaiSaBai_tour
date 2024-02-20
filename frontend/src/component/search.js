import React, { useState } from 'react';
import { Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const Search = ({ tours, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [travelMethod, setTravelMethod] = useState('');
    const [sortByPrice, setSortByPrice] = useState('');

    const handleSearch = () => {
        // ทำการกรองข้อมูลทัวร์ตามเงื่อนไขที่ระบุ
        const filteredTours = tours.filter(tour => {
            // กรองตามชื่อทัวร์
            if (searchTerm && !tour.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            // กรองตามราคาที่ไม่เกิน
            if (maxPrice && tour.price > parseFloat(maxPrice)) {
                return false;
            }
            // กรองตามวิธีการเดินทาง
            if (travelMethod && tour.travelMethod !== travelMethod) {
                return false;
            }
            return true;
        });

        // เรียงลำดับข้อมูลตามราคา
        if (sortByPrice === 'ascending') {
            filteredTours.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === 'descending') {
            filteredTours.sort((a, b) => b.price - a.price);
        }

        // ส่งข้อมูลที่กรองแล้วไปยัง component ที่เรียกใช้ Search
        onSearch(filteredTours);
    };

    return (
        <div>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <FormControl type="number" placeholder="Max Price" className="mr-sm-2" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                <DropdownButton title={travelMethod ? travelMethod : 'Travel Method'} className="mr-sm-2">
                    <Dropdown.Item onClick={() => setTravelMethod('Bus')}>Bus</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTravelMethod('Train')}>Train</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTravelMethod('Airplane')}>Airplane</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title={sortByPrice ? `Sort by ${sortByPrice}` : 'Sort by'} className="mr-sm-2">
                    <Dropdown.Item onClick={() => setSortByPrice('ascending')}>Low to High</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortByPrice('descending')}>High to Low</Dropdown.Item>
                </DropdownButton>
                <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
        </div>
    );
};

export default Search;
