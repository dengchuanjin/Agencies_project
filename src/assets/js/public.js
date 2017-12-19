/**
 * Created by leibo on 17/11/2.
 */
export default {
  isBackCode(code,_this){
    if(code.backCode==='005'||code.backCode==='001'||code.backCode==='002'||code.backCode==='003'||code.backCode==='004'||code.backCode==='000'){
      _this.$message({
        showClose: true,
        message: code.backResult,
        type: 'error'
      });
    }
  }
}

