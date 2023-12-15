import React, { useState } from 'react';
import { Form, Container, Button, InputGroup, Table } from 'react-bootstrap';

let nextId = 0;

const Store = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);
    const [edit, setEdit] = useState(null)

    const handleAdd = () => {
        if (name && quantity && price) {
            const newitems = {
                id: ++nextId,
                name: name,
                quantity: quantity,
                price: price,
            }
            const updateditems = [...items, newitems]
            console.log(updateditems)
            setItems(updateditems)
            setName('');
            setQuantity('');
            setPrice('')
            localStorage.setItem("items", JSON.stringify(updateditems))
        }
        else {
            alert("please add fields")
        }
    }

    function handleEdit(id, index) {
        const editItem = items.find((ele) => ele.id === id)
        setName(editItem.name)
        setQuantity(editItem.quantity)
        setPrice(editItem.price)
        setEdit(index)
    }

    const handleUpdate = () => {
        if (name !== '' && quantity !== '' && price !== "") {
            setItems((previtems) => {
                const updateditem = [...previtems];
                updateditem[edit] = { ...updateditem[edit], name, quantity, price };
                localStorage.setItem("items", JSON.stringify(updateditem));
                return updateditem;
            });
            setName('');
            setQuantity('');
            setPrice('');
            setEdit(null);

        }
    };

    function handleDelete(id) {
        const element = JSON.parse(localStorage.getItem("items")).filter(a => a.id !== id)
        localStorage.setItem("items", JSON.stringify(element));
        setItems(element)
        nextId--
    }

    function handlePlus() {
        items.quantity += 1
    }

    return (
        <>
            <Container>
                <h1 className='mt-4'>Stohhre</h1>
                <Form className='mt-5'>
                    <Form.Label>Item Name</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control
                            value={name}
                            type="text"
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>
                    <Form.Label>Qudddantity</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={quantity}
                            type="number"
                            min={1}
                            onChange={(e) => {
                                const inputQuantity = e.target.value;
                                if (inputQuantity === '0' || inputQuantity.includes('e')) {
                                    e.target.value = '';
                                } else {
                                    setQuantity(inputQuantity);
                                }
                            }}
                        />
                    </InputGroup>

                    <Form.Label>Price</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={price}
                            type='number'
                            min={1}
                            onChange={(e) => {
                                const inputPrice = e.target.value;
                                if (inputPrice === '0' || inputPrice.includes('e')) {
                                    e.target.value = '';
                                } else {
                                    setPrice(inputPrice);
                                }
                            }}
                        />
                    </InputGroup>
                </Form>
                <div className='select m-4'>
                    {edit === null ? <Button
                        onClick={handleAdd}
                        size="lg" className="m-3" variant="primary" >Add</Button>
                        :
                        <Button
                            onClick={handleUpdate}
                            size="lg" className="m-3" variant="primary" >Update</Button>}{' '}</div>

                <Table className='container' striped bordered hover variant="dark">
                    <thead>
                        {items?.length !== 0 && <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>}
                    </thead>

                    <tbody>
                        {items?.map((data, index) => {
                            const totalPrice = (data.price * data.quantity)
                            return (
                                <tr key={data.id}>
                                    <td >{index + 1}</td>
                                    <td>{data.name}</td>
                                    <td><Button variant="success" onClick={() => handlePlus}>Plus</Button>
                                        {data.quantity}
                                        <Button variant="success" onClick={() => handlePlus}>Minus</Button>
                                    </td>
                                    <td><Button variant="success" onClick={() => handlePlus}>Plus</Button>
                                        ₹{data.price}
                                        <Button variant="success" onClick={() => handlePlus}>Minus</Button></td>
                                    <td>₹{totalPrice}</td>
                                    <td>
                                        <Button variant="success" onClick={() => handleEdit(data.id, index)} >Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(data.id)} >Delete</Button>{' '}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );

};

export default Store;