import React, { useState } from 'react'
import { Form, Container, Button, InputGroup, Table } from 'react-bootstrap';

const Store = () => {

    let nextId = 0;

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [item, setItem] = useState([])
    const [edit, setEdit] = useState(null)


    const handleAdd = () => {
        if (name && quantity && price) {
            const newItem = {
                id: ++nextId,
                name: name,
                quantity: quantity,
                price: price,
            }   
            const updatedItems = [...item, newItem]
            console.log(updatedItems)
            setItem(updatedItems)
            setName('');
            setQuantity('');
            setPrice('')
            localStorage.setItem("item", JSON.stringify(updatedItems))
        }
        else {
            alert("please add fields")
        }
    }

    function handleEdit(id, index) {
        const edit = item.find((ele) => ele.id === id)
        setName(edit.name)
        setQuantity(edit.quantity)
        setEdit(index)
    }

    const handleUpdate = () => {
        if (name && quantity && price) {
            setItem((prevItem) => {
                const updateItem = [...prevItem];
                updateItem[edit] = { ...updateItem[edit], name, quantity, price };
                return updateItem;
            });
            setName('');
            setQuantity('');
            setEdit(null);
        }
    };

    function handleDelete(id) {
        const upItems = item.filter((a) => a.id !== id)
        setItem(upItems)
    }

    return (
        <>
            <Container >
                <Form className='mt-5'>
                    <Form.Label>Item Name</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control
                            value={name}
                            type="text"
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>
                    <Form.Label>Quantity</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={quantity}
                            type="number"
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Label>Price</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control
                            value={price}
                            type='number'
                            onChange={e => setPrice(e.target.value)}
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

                <Table className='container mt-5' striped bordered hover variant="dark">
                    <thead>
                        {item?.length !== 0 && <tr>
                            <th>No.</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>}
                    </thead>
                    <tbody>
                        {item?.map((data, index) => {
                            const totalPrice = (data.price * data.quantity)
                            return (
                                <tr key={data.id}>
                                    <td >{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.quantity}</td>
                                    <td>₹{data.price}</td>
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
    )
}

export default Store
