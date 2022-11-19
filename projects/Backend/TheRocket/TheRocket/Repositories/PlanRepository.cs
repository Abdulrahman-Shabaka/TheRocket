﻿using TheRocket.Entities;
using TheRocket.Repositories.RepoInterfaces;
using System.Threading.Tasks;
using TheRocket.TheRocketDbContexts;
using Microsoft.AspNetCore.Mvc;
using TheRocket.Dtos;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using TheRocket.Shared;
using System.Collections.Generic;

namespace TheRocket.Repositories
{
    
    public class PlanRepository : IPlanRepository
    {
        private readonly IMapper Mapper;
        private readonly TheRocketDbContext Context;
        public PlanRepository(TheRocketDbContext context, IMapper mapper)
        {
            Context=context;
            Mapper=mapper;
        }
        public async Task<SharedResponse<PlanDto>> Create(PlanDto plandto)
        {


            if (Context.Plans == null)
            {
                return new SharedResponse<PlanDto>(Status.problem, null, "Entity Set 'db.Plans' is null");
            }
            Plan plan = Mapper.Map<Plan>(plandto);
            Context.Plans.Add(plan);
            try
            {
                await Context.SaveChangesAsync();
                plandto = Mapper.Map<PlanDto>(plan);
                return new SharedResponse<PlanDto>(Status.createdAtAction, plandto);
            }
            catch (Exception ex)
            {
                return new SharedResponse<PlanDto>(Status.badRequest, null, ex.ToString());
            }

        }

        public Task<SharedResponse<PlanDto>> Create(SharedResponse<List<PlanDto>> model)
        {
            throw new NotImplementedException();
        }

        public async Task<SharedResponse<PlanDto>> Delete(int Id)
        {
            if (Context.Plans == null)
            {
                return new SharedResponse<PlanDto>(Status.notFound, null);

            }
            var plan = await Context.Plans.Where(p => p.Id == Id && p.IsDeleted == false).FirstOrDefaultAsync();
            if (plan == null)
            {
                return new SharedResponse<PlanDto>(Status.notFound, null);
            }
            plan.IsDeleted = true;
            await Context.SaveChangesAsync();
            return new SharedResponse<PlanDto>(Status.noContent, null);
        }

        public async Task <SharedResponse<List<PlanDto>>> GetAll()
        {
            {
                if (Context.Plans == null)
                    return new SharedResponse<List<PlanDto>>(Status.notFound, null);
                var plans = await Context.Plans.Where(p => p.IsDeleted == false).ToListAsync();
                List<PlanDto> Plans = Mapper.Map<List<PlanDto>>(plans);
                return new  SharedResponse<List<PlanDto>>(Status.found, Plans);
            }

        }

        public async Task<SharedResponse<PlanDto>> GetById(int Id)
        {

            var plan = Context.Plans.Where(p => p.Id == Id).FirstOrDefaultAsync();
            var p = new PlanDto();
            Mapper.Map(plan, p);
            return new SharedResponse<PlanDto>(Status.found, p);
        }

        public async Task<Plan> GetPlanByName(string name)
        {
            return await Context.Plans.FirstOrDefaultAsync(p => p.Name.ToLower()==name.ToLower() && p.IsDeleted==false);
        }

        public bool IsExists(int Id)
        {
            return (Context.Plans?.Any(p => p.Id == Id && p.IsDeleted==false)).GetValueOrDefault();
        }
   
        public async Task<SharedResponse<PlanDto>> Update(int Id, PlanDto model)
        {
            if (Id != model.Id)
            {
                return new SharedResponse<PlanDto>(Status.badRequest, null);
            }

            Plan plan = Mapper.Map<Plan>(model);

            Context.Entry(plan).State = EntityState.Modified;

            try
            {
                if (IsExists(Id))
                    await Context.SaveChangesAsync();
                else
                    return new SharedResponse<PlanDto>(Status.notFound, null);
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }

            return new SharedResponse<PlanDto>(Status.noContent, null);
        }

        public Task<SharedResponse<PlanDto>> Update(int Id, SharedResponse<List<PlanDto>> model)
        {
            throw new NotImplementedException();
        }

        Task<PlanDto> IBaseRepo<SharedResponse<PlanDto>, PlanDto, SharedResponse<List<PlanDto>>>.GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
