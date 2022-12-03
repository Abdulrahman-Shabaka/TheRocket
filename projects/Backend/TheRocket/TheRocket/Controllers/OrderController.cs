﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheRocket.Dtos;
using TheRocket.Repositories;
using TheRocket.Repositories.RepoInterfaces;
using TheRocket.Shared;
using TheRocket.TheRocketDbContexts;

namespace TheRocket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Buyer")]

    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo Order;
        private readonly TheRocketDbContext Context;
        public OrderController(IOrderRepo order, TheRocketDbContext context)
        {
            Order = order;
            Context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<List<OrderDto>>> GetAll()
        {
            SharedResponse<List<OrderDto>> response = await Order.GetAll();
            if (response.status == Status.notFound) return NotFound();
            return Ok(response.data);
        }
        [HttpGet("[action]")]
        [Authorize]
        public async Task<IActionResult> GetById([FromQuery] int id)
        {
            SharedResponse<OrderDto> response = await Order.GetById(id);
            if (response.status == Status.notFound) return NotFound();
            return Ok(response.data);

        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBySellerId([FromQuery] int SellerId)
        {
            SharedResponse<List<OrderDto>> response = await Order.GetBySellerId(SellerId);
            if (response.status == Status.notFound) return NotFound();
            return Ok(response.data);

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetByBuyerId([FromQuery] int BuyerId)
        {
            SharedResponse<List<OrderDto>> response = await Order.GetByBuyerId(BuyerId);
            if (response.status == Status.notFound) return NotFound();
            return Ok(response.data);

        }

        [HttpPut("[action]")]
        [AllowAnonymous]

        public async Task<IActionResult> AcceptOrReturnOrder([FromQuery] int orderId, [FromQuery] int ammount, [FromQuery] bool Accept)
        {
            if (orderId == 0 || ammount == 0 || Accept == null) return BadRequest();
            var response = await Order.AcceptOrReturnOrder(orderId, ammount, Accept);
            if (response.data == true)
                return Ok("Done");
            return Problem("problem");

        }
        [HttpDelete]
        public async Task<ActionResult<OrderDto>> DeleteOrder([FromQuery] int id)
        {
            SharedResponse<OrderDto> response = await Order.Delete(id);
            if (response.status == Status.notFound) return NotFound();
            return NoContent();
        }

        [HttpPut("[action]")]
        [Authorize(Roles ="Buyer")]
        public async Task<ActionResult<OrderDto>> RequestReturn([FromQuery] int OrderId){
            if(OrderId==0)return BadRequest();
            var response=await Order.RequestReturn(OrderId);
            if(response.status==Status.noContent)return Ok(true);
            return Problem("false");
        }

        [HttpPut]

        [AllowAnonymous]

        public async Task<ActionResult<OrderDto>> PutOrder([FromQuery] int id, OrderDto order)
        {
            SharedResponse<OrderDto> response = await Order.Update(id, order);
            if (response.status == Status.badRequest) return BadRequest();
            else if (response.status == Status.notFound) return NotFound();
            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<OrderDto>> PostOrder(OrderDto order)
        {
            SharedResponse<OrderDto> response = await Order.Create(order);
            if (response.status == Status.problem) return Problem(response.message);
            if (response.status == Status.badRequest) return BadRequest(response.message);
            return Ok(response.data);
        }
    }
}
