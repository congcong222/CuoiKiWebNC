using Du_An_Cuoi_Ki_WebNC.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NguyenVanCong_2307.Models;
using System.Collections.Specialized;
namespace Du_An_Cuoi_Ki_WebNC.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class CongAPI : ControllerBase
    {
        private readonly Dbcontext _dbContext;
        public CongAPI(Dbcontext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("List")]
        public async Task<ActionResult<IEnumerable<MENU>>> GetBrands()
        {
            if (_dbContext.Brands == null)
            {
                return NotFound();
            }
            return await _dbContext.Brands.ToListAsync();
        }


        [HttpGet("ListId")]
        public async Task<ActionResult<MENU>> GetMeNu(int id)
        {
            if (_dbContext.Brands == null)
            {
                return NotFound();
            }

            var brand = await _dbContext.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return Ok(brand);
        }
        [HttpPost("Insert")]
        public async Task<ActionResult<MENU>> PostBrand(MENU brand)
        {
            _dbContext.Brands.Add(brand);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMeNu), new { id = brand.IDMON }, brand);
        }
        [HttpPut("Update")]
        public async Task<IActionResult> PutBrand(int id, MENU brand)
        {
            if (id != brand.IDMON)
            {
                return BadRequest();
            }
            _dbContext.Entry(brand).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }
        private bool BrandAvailable(int id)
        {
            return (_dbContext.Brands?.Any(x => x.IDMON == id)).GetValueOrDefault();
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            if (_dbContext.Brands == null)
            {
                return NotFound();
            }
            var brand = await _dbContext.Brands.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }
            _dbContext.Brands.Remove(brand);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("ListMonan")]
        public async Task<ActionResult<IEnumerable<MonAn>>> MonAns()
        {
            if (_dbContext.MonAns == null)
            {
                return NotFound();
            }
            return await _dbContext.MonAns.ToListAsync();
        }
    }

}
